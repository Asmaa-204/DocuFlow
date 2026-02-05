const { 
    WorkflowInstance, Workflow, Stage, Request, User, Document, Access, Template, Department 
} = require('../models');
const { Op } = require("sequelize");
const AppError = require("../errors/AppError");
const SequelizeQueryBuilder = require("../utils/SequelizeQueryBuilder");
const withTransaction = require('../utils/withTransaction');
const DocumentService = require('./document.service');
const ar = require('../translations/ar');

class RequestService {
    
    // ===== Common Include Definitions =====
    static includeWorkflowTitle = {
        model: WorkflowInstance,
        as: 'instance',
        include: [{ model: Workflow, as: 'workflow', attributes: ['title'] }]
    };

    static includeStage = {
        model: Stage,
        as: 'stage'
    }

    static includeDocuments = {
        model: Document,
        as: 'documents',
        attributes: ['id']
    };

    static includeTemplateIds = {
        model: Stage,
        as: 'stage',
        include: [{ as: 'templates', model: Template, attributes: ['id'] }]
    };

    static includeManager = { model: User, as: 'manager', attributes: ['id'] };
    static includeAffairs = { model: User, as: 'affairsEmployee', attributes: ['id'] };

    // ===== Helpers =====

    static _transformRequest(request) {
        const plain = request.get({ plain: true });
        plain.workflowTitle = plain.instance?.workflow?.title || null;
        delete plain.instance;
        return plain;
    }

    static async _fetchRequests(query, whereExtra = {}) {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.filter().sort().attributes().get();
        filter.where = { ...filter.where, ...whereExtra };
        filter.include = [this.includeWorkflowTitle, this.includeDocuments];

        const requests = await Request.findAll(filter);
        return requests.map(req => this._transformRequest(req));
    }


    static getAllRequests(query) 
    {
        return this._fetchRequests(query);
    }


    static getUserSentRequests(userId, query) 
    {
        return this._fetchRequests(query, { userId });
    }


    static getUserIncomingRequests(userId, query)
    {
        return this._fetchRequests(query, {
            assignedToUserId: userId,
            status: { [Op.ne]: 'draft' }
        });
    }

    static async getRequest(requestId, query, user) 
    {
        const queryBuilder = new SequelizeQueryBuilder(query);
        const filter = queryBuilder.attributes().get();
        filter.include = [this.includeWorkflowTitle, this.includeDocuments];

        const request = await Request.findByPk(requestId, filter);
        if (!request) throw new AppError(ar.request.notFound, 404);

        const access = await Access.findOne({
            where: { requestId: request.id, userId: user.id },
            attributes: ['accessLevel']
        });

        if (!access?.accessLevel && user.role !== 'administrator') {
            throw new AppError(ar.request.noPermission, 403);
        }

        return this._transformRequest(request);
    }

    static async createRequest(instanceId, note, userId, transaction)
    {
        const cb = async (t) => {
            const instance = await WorkflowInstance.findByPk(instanceId, {
                include: [this.includeTemplateIds],
                transaction
            });
        
            if (!instance) throw new AppError(ar.instance.notFound, 404);

            const nextStage = await Stage.findOne({
                where: {
                    workflowId: instance.workflowId,
                    stageOrder: instance.stage.stageOrder + 1
                },
                transaction
            });


            let assignedToUserId = null;
            
            if (nextStage) {
                const include = [];
                
                if (nextStage.role === 'department_manager') include.push(this.includeManager);
                else if (nextStage.role === 'administrator') include.push(this.includeAffairs);

                const department = await Department.findByPk(instance.departmentId, { include, transaction });
                assignedToUserId = department?.manager?.id || department?.affairsEmployee?.id || null;
            }

            const request = await Request.create({
                instanceId,
                stageId: instance.stageId,
                note,
                userId,
                assignedToUserId,
                status: 'draft'
            }, { transaction });

            const documents = (instance.stage.templates || []).map(t => ({
                templateId: t.id,
                data: null,
                requestId: request.id
            }));

            await Access.create({
                requestId: request.id,
                userId,
                accessLevel: 'edit'
            }, { transaction });

            if (documents.length > 0) {
                await Document.bulkCreate(documents, { transaction });
            }

            const createdDocuments = await Document.findAll({
                where: { requestId: request.id },
                attributes: ['id'],
                transaction
            });

            request.documents = createdDocuments;
            return request;
        };

        if(transaction)
            return await cb(transaction);
        else
            return await withTransaction(cb);
    }

    static async getRequestById(requestId) 
    {
        const request = await Request.findByPk(requestId);
        if (!request) throw new AppError(ar.request.notFound, 404);
        return request;
    }

    static async updateMyRequest(request, status, note, assignedTo, transaction) 
    {
        const cb = async (t) => {
            const allowedStatuses = ['pending', 'draft'];

            if (!allowedStatuses.includes(status)) {
                throw new AppError(ar.request.invalidStatus(status), 400);
            }
        
            if (status === 'pending') {
                if (!request.assignedToUserId) {
                    throw new AppError(ar.request.cannotSetPendingNoAssignedUser, 400);
                }

                const documents = await Document.findAll({
                    where: { requestId: request.id },
                    transaction: t
                });

                await DocumentService.validateDocumentsData(documents, false);

                await Access.create({
                    requestId: request.id,
                    userId: request.assignedToUserId,
                    accessLevel: 'respond'
                }, { transaction: t });

                await Access.update(
                    { accessLevel: 'read' },
                    {
                        where: { requestId: request.id, userId: request.userId },
                        transaction: t
                    }
                );
            }

            request.status = status;
            request.note = note || request.note;

            await request.save({ transaction: t });
            return request;
        };



        if(transaction)
            return await cb(transaction);
        else
            return await withTransaction(cb);
    }

        static async advanceInstance(instanceId, status, transaction) {
        
        const cb = async (transaction) => {

            const instance = await WorkflowInstance.findByPk(instanceId, {
                include: [RequestService.includeStage],
                transaction
            });

            if (!instance) {
                throw new AppError(ar.instance.notFound, 404);
            }

            const nextStages = await Stage.findAll({
                where: {
                    workflowId: instance.workflowId,
                    stageOrder: {
                        [Op.in]: [
                            instance.stage.stageOrder + 1,
                            instance.stage.stageOrder + 2
                        ]
                    }
                },
                order: [['stageOrder', 'ASC']],
                transaction
            });

            const nextStage = nextStages[0];
            const secondNextStage = nextStages[1];

            // Advance stage or mark completed
            if (nextStage) {
                await instance.update({ stageId: nextStage.id }, { transaction });
            }

            if (secondNextStage) {
                await RequestService._createRequest(instance.id, null, instance.userId, transaction);
            } else {
                await instance.update({ status: 'completed' }, { transaction });
            }

            // Reload to get updated data
            await instance.reload({
                include: [RequestService.includeStage],
                transaction
            });

            return instance;
        };

        if(transaction)
            return await cb(transaction);
        else
            return await withTransaction(cb);
    }


    static async respondToRequest(request, newStatus, rejectionReason, transaction) {
        const cb = async (t) => {
            const allowedStatuses = ['approved', 'rejected'];

            if (!allowedStatuses.includes(newStatus)) {
                throw new AppError(ar.request.invalidResponseStatus, 400);
            }

            // If rejected, require a reason
            if (newStatus === 'rejected' && !rejectionReason) {
                throw new AppError(ar.request.rejectionReasonRequired, 400);
            }

            // If approved → advance instance
            if (newStatus === 'approved') {
                const instance = await WorkflowInstance.findByPk(request.instanceId, {
                    include: [RequestService.includeStage],
                    transaction: t
                });

                if (!instance) {
                    throw new AppError(ar.instance.notFound, 404);
                }

                const nextStages = await Stage.findAll({
                    where: {
                        workflowId: instance.workflowId,
                        stageOrder: {
                            [Op.in]: [
                                instance.stage.stageOrder + 1,
                                instance.stage.stageOrder + 2
                            ]
                        }
                    },
                    order: [['stageOrder', 'ASC']],
                    transaction: t
                });

                const nextStage = nextStages[0];
                const secondNextStage = nextStages[1];

                if (nextStage) {
                    await instance.update({ stageId: nextStage.id }, { transaction: t });
                }

                if (secondNextStage) {
                    await RequestService._createRequest(instance.id, null, instance.userId, t);
                } else {
                    await instance.update({ status: 'completed' }, { transaction: t });
                }

                await instance.reload({
                    include: [RequestService.includeStage],
                    transaction: t
                });
            }

            // Update the request status and rejection reason
            request.status = newStatus;
            if (newStatus === 'rejected') {
                request.rejectionReason = rejectionReason;
            }
            await request.save({ transaction: t });

            return request;
        };

        if (transaction)
            return await cb(transaction);
        else
            return await withTransaction(cb);
    }

}

module.exports = RequestService;

const MeController = require('../controllers/me.controller');
const { User, Activity } = require('../models');
const { logActivity } = require('../utils/activityLogger');

jest.mock('../models', () => ({
    User: {
        findByPk: jest.fn()
    },
    Activity: {
        findAll: jest.fn()
    }
}));

jest.mock('../utils/activityLogger', () => ({
    logActivity: jest.fn()
}));

jest.mock('../utils/asyncDec', () => fn => fn);

describe('MeController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            user: { id: 1 },
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('updateProfile', () => {
        it('should update user profile and log activity', async () => {
            const user = {
                id: 1,
                update: jest.fn().mockResolvedValue(true)
            };
            User.findByPk.mockResolvedValue(user);
            req.body = { firstName: 'New', lastName: 'Name', email: 'new@example.com' };

            await MeController.updateProfile(req, res);

            expect(user.update).toHaveBeenCalledWith(req.body);
            expect(logActivity).toHaveBeenCalledWith(1, 'PROFILE_UPDATE', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('changePassword', () => {
        it('should change password if old password matches', async () => {
            const user = {
                id: 1,
                comparePassword: jest.fn().mockResolvedValue(true),
                save: jest.fn().mockResolvedValue(true)
            };
            User.findByPk.mockResolvedValue(user);
            req.body = { oldPassword: 'old', newPassword: 'new' };

            await MeController.changePassword(req, res);

            expect(user.password).toBe('new');
            expect(user.save).toHaveBeenCalled();
            expect(logActivity).toHaveBeenCalledWith(1, 'PASSWORD_CHANGE');
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getActivityHistory', () => {
        it('should return activities for the user', async () => {
            const activities = [{ id: 1, action: 'TEST' }];
            Activity.findAll.mockResolvedValue(activities);

            await MeController.getActivityHistory(req, res);

            expect(Activity.findAll).toHaveBeenCalledWith({
                where: { userId: 1 },
                order: [['createdAt', 'DESC']]
            });
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: { activities }
            });
        });
    });
});

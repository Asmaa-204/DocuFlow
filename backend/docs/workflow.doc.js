/**
 * @api {get} /workflow Get all workflows
 * @apiName GetAllWorkflows
 * @apiGroup Workflow
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiSuccess {Object[]} workflows Array of workflow objects
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Unauthorized)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "workflows": [
 *              {
 *                  "id": 1,
 *                  "title": "Research Proposal Approval",
 *                  "description": "Process for approving research proposals",
 *                  "createdAt": "2025-06-19T10:00:00.000Z",
 *                  "updatedAt": "2025-06-19T10:00:00.000Z",
 *                  "stages": [
 *                      {
 *                          "id": 1,
 *                          "title": "Initial Submission",
 *                          "description": "Submit research proposal",
 *                          "role": "professor",
 *                          "stageOrder": 1,
 *                          "workflowId": 1
 *                      }
 *                  ]
 *              }
 *          ]
 *      }
 *    }
 */

/**
 * @api {post} /workflow Create a new workflow
 * @apiName CreateWorkflow
 * @apiGroup Workflow
 * @apiPermission administrator
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiBody {String} title Workflow title
 * @apiBody {String} [description] Workflow description
 * @apiBody {Object[]} stages Array of stage objects
 * @apiBody {String} stages.title Stage title
 * @apiBody {String} [stages.description] Stage description
 * @apiBody {String="professor","department_manager","administrator"} stages.role Required role for this stage
 * @apiBody {Number} stages.stageOrder Order of the stage (must be sequential starting from 1)
 *
 * @apiSuccess {Object} workflow Created workflow object
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example request:
 *    {
 *      "title": "Research Proposal Approval",
 *      "description": "Process for approving research proposals",
 *      "stages": [
 *          {
 *              "title": "Initial Submission",
 *              "description": "Submit research proposal",
 *              "role": "professor",
 *              "stageOrder": 1
 *          },
 *          {
 *              "title": "Department Review",
 *              "description": "Department manager reviews proposal",
 *              "role": "department_manager",
 *              "stageOrder": 2
 *          }
 *      ]
 *    }
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "workflow": {
 *              "id": 1,
 *              "title": "Research Proposal Approval",
 *              "description": "Process for approving research proposals",
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:00:00.000Z"
 *          }
 *      }
 *    }
 */

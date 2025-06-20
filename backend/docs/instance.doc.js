/**
 * @api {post} /instance Create a new workflow instance
 * @apiName CreateInstance
 * @apiGroup Instance
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiBody {Number} workflowId ID of the workflow to instantiate
 *
 * @apiSuccess {Object} instance Created instance object
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example request:
 *    {
 *      "workflowId": 1
 *    }
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "instance": {
 *              "id": 1,
 *              "workflowId": 1,
 *              "stageId": 1,
 *              "userId": 1,
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:00:00.000Z"
 *          }
 *      }
 *    }
 */

/**
 * @api {get} /instance Get all workflow instances
 * @apiName GetAllInstances
 * @apiGroup Instance
 * @apiPermission administrator
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiSuccess {Object[]} instances Array of instance objects
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Unauthorized)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "instances": [
 *              {
 *                  "id": 1,
 *                  "workflowId": 1,
 *                  "stageId": 1,
 *                  "userId": 1,
 *                  "createdAt": "2025-06-19T10:00:00.000Z",
 *                  "updatedAt": "2025-06-19T10:00:00.000Z"
 *              }
 *          ]
 *      }
 *    }
 */

/**
 * @api {get} /instance/mine Get my workflow instances
 * @apiName GetMyInstances
 * @apiGroup Instance
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiSuccess {Object[]} instances Array of user's instance objects
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Unauthorized)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "instances": [
 *              {
 *                  "id": 1,
 *                  "workflowId": 1,
 *                  "stageId": 1,
 *                  "userId": 1,
 *                  "createdAt": "2025-06-19T10:00:00.000Z",
 *                  "updatedAt": "2025-06-19T10:00:00.000Z"
 *              }
 *          ]
 *      }
 *    }
 */

/**
 * @api {get} /instance/:id Get a specific workflow instance
 * @apiName GetInstance
 * @apiGroup Instance
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiParam {Number} id Instance ID
 *
 * @apiSuccess {Object} instance Instance object
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Instance not found)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "instance": {
 *              "id": 1,
 *              "workflowId": 1,
 *              "stageId": 1,
 *              "userId": 1,
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:00:00.000Z"
 *          }
 *      }
 *    }
 */
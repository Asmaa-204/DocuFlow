/**
 * @api {post} /request Create a new request
 * @apiName CreateRequest
 * @apiGroup Request
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiBody {Number} instanceId ID of the workflow instance
 * @apiBody {String} note Request note/description
 * @apiBody {Boolean} [isDraft=false] Whether this is a draft request
 *
 * @apiSuccess {Object} request Created request object
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example request:
 *    {
 *      "instanceId": 1,
 *      "note": "Please approve my research proposal for AI in healthcare",
 *      "isDraft": false
 *    }
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "request": {
 *              "id": 1,
 *              "instanceId": 1,
 *              "stageId": 1,
 *              "userId": 1,
 *              "assignedToUserId": null,
 *              "note": "Please approve my research proposal for AI in healthcare",
 *              "status": "pending",
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:00:00.000Z"
 *          }
 *      }
 *    }
 */

/**
 * @api {put} /request/:id Update a request
 * @apiName UpdateRequest
 * @apiGroup Request
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiParam {Number} id Request ID
 *
 * @apiBody {String} note Updated request note/description
 * @apiBody {Boolean} [isDraft=false] Whether this is a draft request
 *
 * @apiSuccess {Object} request Updated request object
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Request not found)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example request:
 *    {
 *      "note": "Updated research proposal for AI in healthcare with new methodology",
 *      "isDraft": false
 *    }
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "request": {
 *              "id": 1,
 *              "instanceId": 1,
 *              "stageId": 1,
 *              "userId": 1,
 *              "assignedToUserId": null,
 *              "note": "Updated research proposal for AI in healthcare with new methodology",
 *              "status": "pending",
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:30:00.000Z"
 *          }
 *      }
 *    }
 */

/**
 * @api {get} /request Get all requests
 * @apiName GetAllRequests
 * @apiGroup Request
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiSuccess {Object[]} requests Array of request objects
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Unauthorized)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "requests": [
 *              {
 *                  "id": 1,
 *                  "instanceId": 1,
 *                  "stageId": 1,
 *                  "userId": 1,
 *                  "assignedToUserId": null,
 *                  "note": "Please approve my research proposal",
 *                  "status": "pending",
 *                  "createdAt": "2025-06-19T10:00:00.000Z",
 *                  "updatedAt": "2025-06-19T10:00:00.000Z"
 *              }
 *          ]
 *      }
 *    }
 */

/**
 * @api {get} /request/mine Get my requests
 * @apiName GetMyRequests
 * @apiGroup Request
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiSuccess {Object[]} requests Array of user's request objects
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Unauthorized)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "requests": [
 *              {
 *                  "id": 1,
 *                  "instanceId": 1,
 *                  "stageId": 1,
 *                  "userId": 1,
 *                  "assignedToUserId": null,
 *                  "note": "Please approve my research proposal",
 *                  "status": "pending",
 *                  "createdAt": "2025-06-19T10:00:00.000Z",
 *                  "updatedAt": "2025-06-19T10:00:00.000Z"
 *              }
 *          ]
 *      }
 *    }
 */

/**
 * @api {get} /request/:id Get a specific request
 * @apiName GetRequest
 * @apiGroup Request
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiParam {Number} id Request ID
 *
 * @apiSuccess {Object} request Request object
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Request not found)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "request": {
 *              "id": 1,
 *              "instanceId": 1,
 *              "stageId": 1,
 *              "userId": 1,
 *              "assignedToUserId": null,
 *              "note": "Please approve my research proposal for AI in healthcare",
 *              "status": "pending",
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:00:00.000Z"
 *          }
 *      }
 *    }
 */
/**
 * @api {post} /auth/signup Register a new user
 * @apiName Signup
 * @apiGroup Auth
 *
 * @apiBody {String} firstName User's first name
 * @apiBody {String} lastName User's last name
 * @apiBody {String} email User's email address
 * @apiBody {String} password User's password
 * @apiBody {String="professor","department_manager","administrator"} [role="professor"] User's role
 *
 * @apiSuccess {Object} data.user User object containing user data
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Email already exists)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example request:
 *    {
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "email": "user@example.com",
 *      "password": "password123",
 *      "role": "professor"
 *    }
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "user": {
 *              "id": 1,
 *              "firstName": "John",
 *              "lastName": "Doe",
 *              "email": "user@example.com",
 *              "role": "professor",
 *              "createdAt": "2025-06-19T10:00:00.000Z",
 *              "updatedAt": "2025-06-19T10:00:00.000Z"
 *          }
 *      }
 *    }
 */

/**
 * @api {post} /auth/login Login to the application
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} email User's email address
 * @apiBody {String} password User's password
 *
 * @apiSuccess {String} data.token JWT token for the user
 * @apiSuccess {String} status Response status
 *
 * @apiError {String} message Error message (Invalid email or password)
 * @apiError {Number} status Status code
 *
 * @apiExample {json} Example request:
 *    {
 *      "email": "user@example.com",
 *      "password": "password123"
 *    }
 *
 * @apiExample {json} Example response:
 *    {
 *      "status": "success",
 *      "data": {
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *      }
 *    }
 */
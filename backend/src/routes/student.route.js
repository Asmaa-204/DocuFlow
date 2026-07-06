const express = require("express");

const studentController = require("../controllers/student.controller");
const { authenticate, authorizeRoles } = require("../middleware/auth");

const studentRouter = express.Router();

// Students supervised by the currently authenticated professor.
// MUST be registered before "/:code" so it is not caught by the param route.
studentRouter.get(
  "/supervised",
  authenticate,
  authorizeRoles(["professor"]),
  studentController.getMySupervisedStudents,
);

// List with filter/sort — administrators, professors, department managers
studentRouter.get(
  "/",
  authenticate,
  authorizeRoles(["administrator", "professor", "department_manager"]),
  studentController.getAllStudents,
);

// Get by code — administrators, professors, department managers
studentRouter.get(
  "/:code",
  authenticate,
  authorizeRoles(["administrator", "professor", "department_manager"]),
  studentController.getStudent,
);

// Create — administrators only
studentRouter.post(
  "/",
  authenticate,
  authorizeRoles(["administrator"]),
  studentController.createStudent,
);

// Update — administrators only
studentRouter.patch(
  "/:code",
  authenticate,
  authorizeRoles(["administrator"]),
  studentController.updateStudent,
);

module.exports = studentRouter;

const asyncDec = require("../utils/asyncDec");
const StudentService = require("../services/student.service");

async function createStudent(req, res) {
  const student = await StudentService.createStudent(req.body);
  res.status(201).json({
    status: "success",
    data: { student },
  });
}

async function updateStudent(req, res) {
  const { code } = req.params;
  const student = await StudentService.updateStudent(code, req.body);
  res.json({
    status: "success",
    data: { student },
  });
}

async function getStudent(req, res) {
  const { code } = req.params;
  const student = await StudentService.getStudentByCode(code);
  res.json({
    status: "success",
    data: { student },
  });
}

async function getAllStudents(req, res) {
  const students = await StudentService.getAllStudents(req.query);
  res.json({
    status: "success",
    data: { students },
  });
}

async function getMySupervisedStudents(req, res) {
  const students = await StudentService.getStudentsSupervisedBy(
    req.user.id,
    req.query,
  );
  res.json({
    status: "success",
    data: { students },
  });
}

module.exports = {
  createStudent: asyncDec(createStudent),
  updateStudent: asyncDec(updateStudent),
  getStudent: asyncDec(getStudent),
  getAllStudents: asyncDec(getAllStudents),
  getMySupervisedStudents: asyncDec(getMySupervisedStudents),
};

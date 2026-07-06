const Joi = require("joi");
const AppError = require("../errors/AppError");
const ar = require("../translations/ar");

const createStudentSchema = Joi.object({
  code: Joi.string().trim().min(1).required(),
  name: Joi.string().trim().min(1).required(),
  registrationStart: Joi.date().iso().required(),
  registrationEnd: Joi.date()
    .iso()
    .greater(Joi.ref("registrationStart"))
    .required(),
});

const updateStudentSchema = Joi.object({
  name: Joi.string().trim().min(1),
  registrationStart: Joi.date().iso(),
  registrationEnd: Joi.date().iso(),
})
  .min(1)
  .custom((value, helpers) => {
    if (
      value.registrationStart &&
      value.registrationEnd &&
      new Date(value.registrationEnd) <= new Date(value.registrationStart)
    ) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "registration date range");

function validateCreateStudent(data) {
  const { error, value } = createStudentSchema.validate(data, {
    abortEarly: false,
  });
  if (error) {
    throw new AppError(
      ar.validation.error(error.details.map((d) => d.message).join(", ")),
      400,
    );
  }
  return value;
}

function validateUpdateStudent(data) {
  const { error, value } = updateStudentSchema.validate(data, {
    abortEarly: false,
  });
  if (error) {
    // Special message when only the date range is invalid
    if (error.details.some((d) => d.type === "any.invalid")) {
      throw new AppError(ar.student.invalidDateRange, 400);
    }
    throw new AppError(
      ar.validation.error(error.details.map((d) => d.message).join(", ")),
      400,
    );
  }
  return value;
}

module.exports = {
  schemas: { createStudentSchema, updateStudentSchema },
  validateCreateStudent,
  validateUpdateStudent,
};

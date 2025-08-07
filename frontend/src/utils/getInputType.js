function getInputType(schema) {
  if (schema?.type === "string") {
    if (schema.format === "email") return "email";
    else if (schema.format === "date") return "date";
    else if (schema.format === "password") return "password";
  }
  if (schema.type === "number" || schema.type === "integer") return "number";
  return "text";
}

export { getInputType };

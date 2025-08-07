import { rankWith, isControl, schemaTypeIs } from "@jsonforms/core";

const InputFieldTester = rankWith(
  3,
  (uischema, schema) =>
    isControl(uischema, schema) &&
    (schemaTypeIs("string")(uischema, schema) ||
      schemaTypeIs("number")(uischema, schema))
);

export { InputFieldTester };

const Ajv = require('ajv');

const ajv = new Ajv({
    allErrors: true,
});

const uiSchemaSchema = {
  type: 'object',
  required: ['type'],
  properties: {
    type: { type: 'string' },
    scope: { type: 'string' },
    elements: {
      type: 'array',
      items: { $ref: '#' } // recursive
    }
  }
};

require('ajv-formats')(ajv);

// Schema Validation
const validateSchema = ajv.getSchema("ajv/lib/refs/json-schema-draft-07.json");
const validateUiSchema = ajv.compile(uiSchemaSchema);

// Export the configured Ajv instance
module.exports = {
    ajv,
    validateSchema,
    validateUiSchema
};

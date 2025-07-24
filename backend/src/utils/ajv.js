const Ajv = require('ajv');

const ajv = new Ajv({
    allErrors: true,
});

require('ajv-formats')(ajv);

// Schema Validation
const validateSchema = ajv.getSchema("ajv/lib/refs/json-schema-draft-07.json");

// Export the configured Ajv instance
module.exports = {
    ajv,
    validateSchema
};

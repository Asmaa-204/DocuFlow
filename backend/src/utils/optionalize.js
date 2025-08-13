function optionalize(schema)
{
    const optionalSchema = { ...schema };
    optionalSchema.required = []
    return optionalSchema;
}

module.exports = optionalize;
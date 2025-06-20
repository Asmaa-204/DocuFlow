
const { sequelize } = require('../models')

async function withTransaction(callback){

    const transaction = await sequelize.transaction();

    try
    {
        const result = await callback(transaction);
        await transaction.commit();
        return result;
    } 
    catch(err)
    {
        await transaction.rollback();
        throw err;
    }

}


module.exports = withTransaction;


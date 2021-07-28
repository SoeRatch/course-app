const db = require('../../db');
const tableNames = require('../../constants/tableNames')

const fields = ['id','title','description','final_price']
module.exports = {
    find() {
        return db(tableNames.program).select(fields);
    },

    async get(id){
        // const [program] = await db(tableNames.program)
        //     .select(fields)
        //     .where({
        //         id,
        //     }).first();
        // return program;

        return db(tableNames.program)
                .select(fields)
                .where({
                        id,
                    }).first();

    },




};



// TODO : write queries

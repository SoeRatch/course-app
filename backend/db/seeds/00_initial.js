const Knex=require('knex');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const tableNames = require('../../src/constants/tableNames')
const orderedTableNames = require('../../src/constants/orderedTableNames')

/** 
 * @param {Knex} knex 
 */

exports.seed = async (knex) => {


  await orderedTableNames
    .reduce(async(promise,table_name)=>{
        await promise;
        console.log('Clearing',table_name);
        return knex(table_name).del();
      },Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');

  const user = [{
      'email':'abcuser_i@null.adp',
      'user_name':'abcuser_i',
      'name':'abc user_i',
      'password':await bcrypt.hash(password,12)
  },
  {
    'email':'abcuser_s@null.adp',
    'user_name':'abcuser_s',
    'name':'abc user_s',
    'password':await bcrypt.hash(password,12)
}
];

  
  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');


  if (process.env.NODE_ENV !== 'test'){

    console.log('User created:',{
      password,
    },createdUser);
    
  }




//  await knex(tableNames.student).insert([{},{}])
    
};

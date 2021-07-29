const { Model } = require('objection');
const schema = require('./users.schema.json');
const tableNames  = require('../../constants/tableNames')

class User extends Model {
    static get tableName() {
      return tableNames.user;
    }
    static get jsonSchema() {
        return schema;
    }

  }

module.exports = User;
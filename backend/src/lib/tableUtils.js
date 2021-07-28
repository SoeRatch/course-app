function addDefaultColumns(table){
    // table.datetime('created_at').notNullable().default(knex.fn.now());
    // table.datetime('updated_at').notNullable().default(knex.fn.now());
    table.timestamps(false,true)
    table.datetime('deleted_at');
  }
  
  function url(table,columnName){
    table.string(columnName,2000);
  }

  function email(table,columnName){
    return table.string(columnName,254);
  }
  
  function references(table, tableName, notNullable = true,columnName = ''){
    const definition = table
      .integer(`${columnName || tableName}_id`)
      .unsigned()
      .references('id')
      .inTable(tableName)
      .onDelete('cascade');

    if(notNullable){
        definition.notNullable();
    }
    return definition;
  
  }

  module.exports = {
      addDefaultColumns,
      url,
      email,
      references
  };
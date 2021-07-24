const Knex=require('knex');

const tableNames = require('../../src/constants/tableNames')

const {
  addDefaultColumns,
  url,
  email,
  references
} = require('../../src/lib/tableUtils')

/** 
 * @param {Knex} knex 
 */

exports.up = async (knex) => {

  await Promise.all([

      knex.schema.createTable(tableNames.user, (table)=>{
        table.increments().notNullable();
        email(table,'email').notNullable().unique();
        table.string('user_name').notNullable().unique();
        table.string('name').notNullable();
        table.string('password',127).notNullable();
        table.string('phone_no',15);
        table.datetime('last_login');
        table.string('gender',20);
        table.string('image_url',2000);
        table.boolean('is_active').defaultTo(true);
        addDefaultColumns(table);
        
      }),

      knex.schema.createTable(tableNames.program, (table)=>{
        table.increments().notNullable();
        table.string('title',254).notNullable().unique();
        table.text('description');
        table.float('price').notNullable().defaultTo(0);
        table.float('discount_perc').defaultTo(0);
        table.float('final_price').defaultTo(0);
        table.float('revenue').defaultTo(0);
        table.float('item_sold').defaultTo(0);
        addDefaultColumns(table); 
      }),
      
      knex.schema.createTable(tableNames.quiz, (table)=>{
        table.increments().notNullable();
        table.string('title',254).notNullable().unique();
        addDefaultColumns(table); 
      })

    ]);



    await Promise.all([
      knex.schema.createTable(tableNames.user_logs,(table)=>{
        table.increments().notNullable();
        table.datetime('login_date').default(knex.fn.now());
        table.datetime('logout_date').default(knex.fn.now());
        references(table,tableNames.user)
      }),

      knex.schema.createTable(tableNames.student,(table)=>{
        table.increments().notNullable();
        references(table,tableNames.user);
        addDefaultColumns(table);
      }),

      knex.schema.createTable(tableNames.instructor,(table)=>{
        table.increments().notNullable();
        url(table,'linkedin_url');
        url(table,'twitter_url');
        url(table,'facebook_url');
        url(table,'youtube_url');
        url(table,'website_url');
        table.text('about_me');
        table.float('rating',3,1).unsigned().defaultTo(0);
        references(table,tableNames.user);
        addDefaultColumns(table);
      }),

      knex.schema.createTable(tableNames.user_role,(table)=>{
        table.increments().notNullable();
        references(table,tableNames.user);
        addDefaultColumns(table);
      }),

      knex.schema.createTable(tableNames.program_images,(table)=>{
        table.increments().notNullable();
        url(table,'url');
        references(table,tableNames.program);
        addDefaultColumns(table);
      }),

      knex.schema.createTable(tableNames.category_program_hierarchy,(table)=>{
        table.increments().notNullable();
        table.string('h1(cat)').notNullable();
        table.string('h2(sub_cat)');
        table.string('h3(topic)');
        references(table,tableNames.program);
        addDefaultColumns(table);
  
      }),

      knex.schema.createTable(tableNames.related_program,(table)=>{
        table.increments().notNullable();
        references(table,tableNames.program);
        references(table,tableNames.program,false,'related_program_id');
         
        addDefaultColumns(table);

      }),

      knex.schema.createTable(tableNames.question,(table)=>{
        table.increments().notNullable();
        table.text('description');
        table.integer('answer').unsigned();
        table.string('option_1');
        table.string('option_2');
        table.string('option_3');
        table.string('option_4');
        table.string('option_5');
        table.string('explanation');
        references(table,tableNames.quiz);
        addDefaultColumns(table);
        
      })

    ]);


  

    await Promise.all([

      knex.schema.createTable(tableNames.course, (table)=>{
        table.increments().notNullable();
        table.string('title',254).notNullable().unique();
        table.text('description');
        table.boolean('program_flag');
        table.float('price').notNullable().defaultTo(0);
        table.float('discount_perc').defaultTo(0);
        table.float('final_price').defaultTo(0);
        table.float('revenue').defaultTo(0);
        table.float('item_sold').defaultTo(0);
        references(table,tableNames.instructor);
        addDefaultColumns(table); 
      }),

      knex.schema.createTable(tableNames.student_program_enroll, (table)=>{
        table.increments().notNullable();        
        table.float('progress_perc');
        table.string('p_c_s_l');
        table.datetime('purchase_date').notNullable();
        references(table,tableNames.student);
        references(table,tableNames.program);
        addDefaultColumns(table);
      })

    ]);


  
    await Promise.all([

      knex.schema.createTable(tableNames.student_course_enroll, (table)=>{
        table.increments().notNullable();        
        table.float('progress_perc');
        table.string('c_s_l');
        table.datetime('purchase_date').notNullable();
        references(table,tableNames.student);
        references(table,tableNames.course);
        addDefaultColumns(table);
      }),


      knex.schema.createTable(tableNames.program_course,(table)=>{
        table.increments().notNullable();
        table.integer('course_order').unsigned();
        table.text('description');
        table.float('course_weight');
        references(table,tableNames.program);
        references(table,tableNames.course);
        addDefaultColumns(table);
      }),

      

      knex.schema.createTable(tableNames.course_images,(table)=>{
        table.increments().notNullable();
        url(table,'url');
        references(table,tableNames.course);
        addDefaultColumns(table);
      }),

      knex.schema.createTable(tableNames.category_course_hierarchy,(table)=>{
        table.increments().notNullable();
        table.string('h1(cat)').notNullable();
        table.string('h2(sub_cat)');
        table.string('h3(topic)');
        references(table,tableNames.course);
        addDefaultColumns(table);
  
      }),

      knex.schema.createTable(tableNames.related_course,(table)=>{
        table.increments().notNullable();
        references(table,tableNames.course);
        references(table,tableNames.course,false,'related_course_id');
        addDefaultColumns(table);

      }),

      knex.schema.createTable(tableNames.section,(table)=>{
        table.increments().notNullable();
        table.string('title',254).notNullable();
        table.text('description');
        references(table,tableNames.course);
        table.float('section_weight');
        table.integer('section_order').unsigned();
        table.integer('quiz_id').unsigned();
        addDefaultColumns(table);  
      })

    ]);


    await knex.schema.createTable(tableNames.lesson,(table)=>{
      table.increments().notNullable();
      table.string('title',254).notNullable();
      table.text('description');
      references(table,tableNames.section);
      table.float('lesson_weight');
      table.integer('lesson_order').unsigned();
      table.integer('quiz_id').unsigned();
      table.string('video_split_string');
      addDefaultColumns(table); 
    });

    await knex.schema.createTable(tableNames.content,(table)=>{
        table.increments().notNullable();
        table.string('content_type',254);
        url(table,'content_url');
        references(table,tableNames.lesson);
        addDefaultColumns(table);
    });

};




exports.down = async (knex) => {

  await knex.schema.dropTableIfExists(tableNames.content);

  await knex.schema.dropTableIfExists(tableNames.lesson);

  await Promise.all([
    tableNames.student_course_enroll,
    tableNames.program_course,
    tableNames.course_images,
    tableNames.category_course_hierarchy,
    tableNames.related_course,
    tableNames.section
  ].map(tableName=> knex.schema.dropTableIfExists(tableName)));

  await Promise.all([
    tableNames.course,
    tableNames.student_program_enroll
  ].map(tableName=> knex.schema.dropTableIfExists(tableName)));

  await Promise.all([
    tableNames.user_logs,
    tableNames.student,
    tableNames.instructor,
    tableNames.user_role,
    tableNames.program_images,
    tableNames.category_program_hierarchy,
    tableNames.related_program,
    tableNames.question
  ].map(tableName=> knex.schema.dropTableIfExists(tableName)));

  await Promise.all([
    tableNames.user,
    tableNames.program,
    tableNames.quiz
  ].map(tableName=> knex.schema.dropTableIfExists(tableName)));

};

create docker-compose.yml file 
create .env file 

> docker-compose up

> npm init -y
> npm i knex
> npm i pg
> npm i dotenv
> npm knex init
> npm i -D eslint
> npx eslint --init

> npx knex migrate:make initial
> npx knex seed:make initial

> npm i bcrypt

[
> npm run migrate -- --debug or knex migrate:latest -- --debug to get the sql code generated

> npx knex migrate:rollback to rollback 
> npx knex migrate:rollback --env test to rollback test db defined in knefile config .

> docker volume ls  to check list of volumes 

> docker volume rm $(docker volume ls -q)  to remove all running volumes

> search in vs code with install extension to go to marketplace 
]

[
    vscode helpful extensions
    - docker
    - jest
    - better comments
    - todo tree
]

> npm i express morgan compression helmet
> npm i -D nodemon
> npm i -D jest supertest

[
create test fb as well but later  update postgres container to create test db on start as well

> docker ps - to find the docker container and then connect to the postgres instance 
> docker exec -t -i <container name> bash 
now from  bash goto psql 
>psql -U admin anydevdb

alternative to 
{
    docker exec -t -i <container name> bash
    psql -U admin anydevdb
}
is
> docker exec -it <container name> psql -U admin anydevdb

>CREATE DATABASE anytestdb;
>exit


now we need to migrate data as well in anytestdb 
>npx jest --init 
a file will be created called  jest.config.js
inside that file search for globalSetup and globalTeardown and then uncomment those line and then change those value to  
    globalSetup: './src/setupTests.js'
and 
    globalTeardown: './src/teardownTests.js'
respectively 

now create setupTests.js and teardownTests.js

]

> npm i objection
ERESOLVE unable to resolve dependency tree
failed so tried below command 
> npm i objection --legacy-peer-deps

> npm i jsonwebtoken
> npm i yup
const express= require('express');

const yup = require('yup');

const bcrypt = require('bcrypt');
// TODO : extract to general hashing util

const jwt = require('../../lib/jwt')
const User = require('../users/users.model')
const router = express.Router();

const schema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(2)
        .required(),
    user_name: yup
        .string()
        .trim()
        .min(2)
        .required(),
    email: yup
        .string()
        .trim()
        .email()
        .required(),
    password: yup 
        .string()
        .min(8)
        .max(200)
        .matches(/[^A-Za-z0-9]/,"password must contain a special character.")
        .matches(/[A-Z]/,"password must contain a uppercase character.")
        .matches(/[a-z]/,"password must contain a locwercase character.")
        .matches(/[0-9]/,"password must contain a number.")
        .required()
})

const errorMessage = {
    invalidLogin: 'Invalid login.',
    emailInUse: 'Email in use.',
    userNameInUse: 'User name in use.'
}

router.post('/signup',async (req,res,next)=>{
    const {name,user_name,email,password} = req.body;
    
    try{

        const createUser = {
            name,
            user_name,
            email,
            password,
        };

        await schema.validate(createUser,{abortEarly:false})
        
        const existingEmail = await User.query().where({email}).first();
        if(existingEmail){
            const error = new Error(errorMessage.emailInUse);
            res.status(403);
            throw error;
        }

        const existingUserName = await User.query().where({user_name}).first();

        if(existingUserName){
            const error = new Error(errorMessage.userNameInUse);
            res.status(403);
            throw error;
        }

        //TODO: get rounds from config 
        const hashedPassword = await bcrypt.hash(password,12);
        const insertedUser = await User.query().insert({
            name,
            user_name,
            email,
            password:hashedPassword,
        });
        delete insertedUser.password;

        const payload = {
            id: insertedUser.id,
            name,
            email,
        };
        const token = await jwt.sign(payload);

        res.json({
            user:payload,
            token,
        });

    } catch(error){
        console.log(error)
        next(error);
    }
    
    
});

router.post('/signin',async (req,res,next)=>{

    const {email,password} = req.body;
    
    try{

        await schema.validate({
            "name":"BeeBo",
            "user_name":"BeeBo",
            email,
            password
        },{abortEarly:false})
        
        const user = await User.query().where({email}).first();
        if(!user){
            const error = new Error(errorMessage.invalidLogin);
            res.status(403);
            throw error;
        }
        
        const validPassword = await bcrypt.compare(password,user.password);
        
        if(!validPassword){
            const error = new Error(errorMessage.invalidLogin);
            res.status(403);
            throw error;
        }

        const payload = {
            id: user.id,
            name:user.name,
            email,
        };
        const token = await jwt.sign(payload);

        res.json({
            user:payload,
            token,
        });

    } catch(error){
        console.log(error)
        next(error);
    }
});

module.exports = router;
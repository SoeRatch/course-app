const express = require('express');

const project = require('../constants/project');


const programs = require('./programs/programs.routes');

const router = express.Router();

router.get('/',(req,res)=>{
    res.json({
        message: project.message,
    });
});

router.use('/programs',programs);


module.exports = router;
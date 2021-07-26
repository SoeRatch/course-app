const express = require('express');

const queries = require('./programs.queries');
const router = express.Router();

// TODO : call  queries
router.get('/', async (req,res)=>{
    const programs = await queries.find();
    res.json(programs);

});

router.get('/:id', async(req,res,next)=>{

    const {id} = req.params;

    try {

        const program = await queries.get(parseInt(id,10) || 0 );

        if(program){
            return res.json(program);
        }
        return next();
        
    }

    catch(error){
        next(error)
    }
    
});

module.exports = router;

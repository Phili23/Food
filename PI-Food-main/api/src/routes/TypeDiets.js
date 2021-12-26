const { Router } = require('express');
const router = Router();
const {TypeDiet} = require('../db');

const axios=require('axios')

let diets = [{name: 'gluten free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'lacto-vegetarian'},
{name: 'lacto ovo vegetarian'},{name: 'vegan'},{name: 'pescatarian'},{name: 'paleolithic'},{name: 'primal'},
{name: 'whole 30'}];


router.get('/',async(req,res)=>{
    console.log(diets)
    TypeDiet.findAll()
    .then((response)=>{
       
        if(response.length >0){
            console.log('yosoy',response)
            return res.json(response).status(200)}
        else{ TypeDiet.bulkCreate(diets) 
            
        .then((response)=>{
           // console.log('yosoy',response)
            return res.json(response);
        })
        .catch((err)=>{next(err);})
    }
    })


})

module.exports = router;

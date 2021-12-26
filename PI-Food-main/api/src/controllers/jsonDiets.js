const {TypeDiet}=require('../db')
const axios=require('axios')

let diets = [{name: 'gluten free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'lacto-vegetarian'},
{name: 'lacto ovo vegetarian'},{name: 'vegan'},{name: 'pescatarian'},{name: 'paleolithic'},{name: 'primal'},
{name: 'whole 30'}];


const getDiets=async(req,res,next) => {
    TypeDiet.findAll()
    .then((verificacion)=>{
        if(verificacion.length <1){return res.json(verficacion).status(200)}
        else{ TypeDiet.bulkCreate(diets) 
            
        .then((verificacion)=>{
            return res.json(verificacion);
        })
        .catch((err)=>{next(err);})
    }
    })


}
module.exports = { 
getDiets  
};
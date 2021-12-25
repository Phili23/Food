const { Router } = require('express');
const router = Router();
const {TypeDiet} = require('../db');
const {diets} = require('../controllers/jsonDiets')

router.get('/', async (req,res) => {
    //console.log(diets);
    const verificacion = await TypeDiet.findAll();
    if(verificacion.length < 1) { 
       const formateo= diets.forEach(e => {
            TypeDiet.findOrCreate({
                where: {name:e.name}
            })
        })
        const carga = await TypeDiet.bulkCreate(formateo);
      console.log("Pre-carga de Genre lista !");
    }  
        //res.send(allTheTypes.map(e => e.name))
})
module.exports = router;

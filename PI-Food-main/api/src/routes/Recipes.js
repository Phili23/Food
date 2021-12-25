const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{Recipe,TypeDiet}=require('../db')
const{getAllRecipes}= require('../controllers/getRecipes')
const { API_KEY } = process.env;
const {axios}=require('axios')

const router = Router();

router.get('/',async(req,res)=>{
    const {title}=req.query;
    const recipesTotal=await getAllRecipes();
    //console.log(recipesTotal)
    if(title){
      const recipesTitle=await recipesTotal.filter(e=>e.title.toLowerCase().includes(title.toLowerCase()))
      recipesTitle.length?
     
      res.status(200).send(recipesTitle):
      res.status(404).send("Receta no encontrado");
       }  
       else{
         
           res.status(200).send(recipesTotal)
          }; 
          
      });

      router.get('/:id', async(req, res,next) => {
        const { id } = req.params
           try {
            const recipeId = await getAllRecipes(id);
            let recipeById =  recipeId.filter(v => v.id == id)
             if (recipeById.length > 0) return res.status(200).send(recipeById);
             res.status(404).send('Receta no encontrada');
         } catch (error) {
             res.status(404).send('Receta no encontrada');
         }
     })

     router.post('/', async (req, res,next) => {
      let {
        title,
        summary,
        spoonacularScore,
        healthScore,
        image,
        analyzedInstructions,
        typeDiets,
        created

    } = req.body;
    if(!title || !summary) {
      return res.status(400).send('Please, insert a title and a summary to continue!');
  }
  try{
    let createdRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      image,
      analyzedInstructions,
      created

    });
    let typeDietDb = await TypeDiet.findAll({ where: {name: typeDiets } }); //name de tabla genre
    createdRecipe.addTypeDiet(typeDietDb);
    // console.log(createdVGame, 'genreeee',genreDb);
    res.status(200).send('Receta creeada con exito!');
  }catch(error){
    next(error);
  }
});
 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

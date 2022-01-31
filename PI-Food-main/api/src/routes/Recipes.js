const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{Recipe,TypeDiet}=require('../db')
const{getAllRecipes}= require('../controllers/getRecipes')
const { API_KEY } = process.env;
const {axios}=require('axios')

const router = Router();
//busqueda por name
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

    //busqueda por id

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
//agregar una receta

     router.post('/', async (req, res,next) => {
      let {
        title,
         summary,
         spoonacularScore,
         healthScore,
         image,
         typeDiets,
         steps,
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
         steps,
         created

    });
    let typeDietDb = await TypeDiet.findAll({ where: {name: typeDiets } }); //name de tabla genre
    createdRecipe.addTypeDiet(typeDietDb);
    res.send('Succesfull');

    res.status(200).send('Receta creeada con exito!');
  }catch(error){
    next(error);
  }
});

// eliminar receta  de la base dtos*/
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Delete de: ', id)
  try {
     if(id){
     const allRecipe = await Recipe.destroy({
      where: {id:id}
   })
   res.send('eliminado de la base de datos')
  }
  } catch (error) {
      res.send(`Error in route /Dog/delete ${error}`);
  }
 
});

 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

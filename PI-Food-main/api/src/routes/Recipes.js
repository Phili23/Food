const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{Recipe,TypeDiet}=require('../db')
const{getAllRecipes}= require('../controllers/getRecipes')
const{getAllRecipesId}= require('../controllers/getRecipesId')
const { API_KEY } = process.env;
const {axios}=require('axios')

const router = Router();
//busqueda por title
router.get('/',async(req,res)=>{
  try {
      const {name}=req.query;
      console.log('yo soy title',name)
      const foodsTotal=await getAllRecipes();
      if(name){
        let foodName=await foodsTotal.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
        foodName.length? 
        res.status(200).send(foodName):
        res.status(404).send("Lo siento, no se encontro el Perrito Buscado");
         }  
         else{
           
             res.status(200).send(foodsTotal)
            }; 
  } catch (error) {
      console.log("Se encontro una falla en el get /dogs", error)
  }
 
        
    });

    //busqueda por id




      router.get('/:id', async(req, res,next) => {
        const { id } = req.params
        console.log('yo soy params',id)
           try {
            const recipeId = await getAllRecipes(id);
            console.log('yo soy recipeId',recipeId)
            let recipeById =  recipeId.filter(v => v.id == id)
             if (recipeById.length > 0) return res.status(200).send(recipeById);
             res.status(404).send('Receta no encontrada');
         } catch (error) {
             res.status(404).send('Receta no encontrada en cgtch');
         }
     })  /*

     router.get('/:id',async (req,res) =>{
      const {id} = req.params
      const allRecipes = await getAllRecipes()
     // console.log(allRecipes.map(e => e.id===parseInt(id)));
      let validate = id.includes("-"); // si tiene el guion es porque se encuentra en la base de datos
  
      if (validate) {
        try {
          let dbId = await Recipe.findByPk(id, { include: TypeDiet });  // entonce la busco directo de la base de datos
          res.status(200).json([dbId]);
        } catch (err) {
          console.log(err);
        }
      }
      
  else {
      try {
        if (id) {
          let recipeId = await allRecipes.filter((el) => el.id === parseInt(id)
          );
         // console.log(recipeId);
          recipeId.length
            ? res.status(200).send(recipeId)
            : res.status(400).send("Not fuound");
        }
      } catch (err) {
        res.json({ message: err });
      }
    }
  });*/


//agregar una receta

     router.post('/', async (req, res) => {
       try{
      let {name,summary,spoonacularScore,healthScore,image,typeDiets,steps,created} = req.body;
     /*  if(!name || !summary) {
      return res.status(400).send('Please, insert a title and a summary to continue!');
  }   */

    let createdRecipe = await Recipe.create({
         name,
         summary,
         spoonacularScore,
         healthScore,
         image,
         steps,
         created

    });
    let typeDietDb = await TypeDiet.findAll({ 
      where: {name: typeDiets } }); //name de tabla genre
    createdRecipe.addTypeDiet(typeDietDb);
   /*  res.send('Succesfull'); */
   res.status(200).send('receta creada') 
  }catch(error){
    console.log(error)
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


// por tipode Dieta
/*
{

  "name": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
  "summary": "Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>192 calories</b>, <b>7g of protein</b>, and <b>6g of fat</b> per serving. For <b>$1.12 per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. ",
  "spoonacularScore": "100",
  "healthScore": "76",
  "image": "https://spoonacular.com/recipeImages/716426-312x231.jpg",
  
  "diets": [
   "gluten free",
  
   "dairy free",
  
  
  "lacto ovo vegetarian",
  
   "vegan"
  
  ],
  
  "steps": [
  
  
  
   "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of "
  ,
  
   "Heat 1T butter and 1T oil in a large skillet over medium heat."]
   }*/
  
  

 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

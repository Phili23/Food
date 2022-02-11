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
      console.log('yo soy dogstotal', name)
      const dogsTotal=await getAllRecipes(name);
      console.log('yo soy dogstotal', dogsTotal)
      if(name){
        let dogsName=await dogsTotal.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length? 
        res.status(200).send(dogsName):
        res.status(404).send("Lo siento, no se encontro el Perrito Buscado");
         }  
         else{
           
             res.status(200).send(dogsTotal)
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


/* 
const getApiByName = async (name) => {
           
  try{
      const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=10&apiKey=${API_KEY}`);
      const { results } = resAxios.data;
      if(results.length > 0){
          let response = results?.map((el) => {
              return {
                  id:el.id,
                  name:el.title,
                  summary:el.summary,
                  spoonacularScore:el.spoonacularScore,
                  healthScore:el.healthScore,
                  image:el.image,
                  typeDiets: el.diets.map((d)=> {return{name:d}}),
                  steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
              }
          })
    return response           
  }

  else{
      console.log("NO hay coincidencia en la API");
      //return ('error');
  }

  }catch (error) {
      console.error(error);
      return ('error')
  }
}

//!                   5
const getDBByName = async (name) => {
  try{
      const DBInfo = await getDBInfo();
      const filtByName = DBInfo.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()));
     
      return filtByName;
  }catch (error) {
      return ('error')
  } 
}
//!                   6     
const getInfoByName = async (name) => {
  try{
      const apiByName = await getApiByName(name)
      const DBByName = await getDBByName(this.name)
      const infoTotal = apiByName.concat(DBByName)
      return infoTotal
  }catch (error) {
      return ('error')
  }
}     

//^       
1
router.get('/Name', async (req, res) => {

const { name } = req.query

if (name) {

  const infoByName = await getInfoByName(name);
  if (infoByName !== 'error'){
      console.log("Se encontro coincidencia con name")
      infoByName.length > 0 ? res.json(infoByName) : res.status(400).json([{ name: 'not found any recipes'}]);
  }else{
      console.log("Error")
      res.status(404).json([{ name: 'Error'}])
  }

}else{
 // para no confundir a home, si no hay un name de busqueda muestra toda la info.
  const allDate = await getAllInfo() 
  if (allDate !== 'error'){  
      res.json(allDate);
  }else{
      res.status(404).json({message:'Error en la búsqueda de datos'})
  }

}
}); */

module.exports = router;

const axios= require('axios');
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY } = process.env;


const  getApiInfo=async()=>{
    let apiUrlOne=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=3&addRecipeInformation=true`)
    console.log(apiUrlOne)
     
    const apiInfo=await apiUrlOne.data.results.map(el=>{
        return{
         id:el.id,
         name:el.title,
         summary:el.summary,
         spoonacularScore:el.spoonacularScore,
         healthScore:el.healthScore,
         image:el.image,
         typeDiets: el.diets.map((d)=> {return{name:d}}),
         steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
          /*typeDiets: el.typeDiets.map(el => el.name)*/
          /* steps: el.analyzedInstructions[0]?.steps.map(e => {
            return {
                   step: e.step
            }
        }) */
     }})

     /* https://github.com/LOLE81/Henry-PI-Food/blob/master/api/src/controllers/recipes.js */
    
     return apiInfo;
 }


const getDbInfo = async () => {
    return await Recipe.findAll({
        include : {
            model : TypeDiet,
            attributes : ['name'],
            through: {
                attributes:[]
            }
        }
    })
}

const   getAllRecipes = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dbInfo);
   // console.log(apiInfo)
    return allInfo;
};


module.exports= {
    getAllRecipes,
    
}
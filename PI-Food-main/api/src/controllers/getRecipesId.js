const axios= require('axios');
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY } = process.env;


const getApiById=async()=>{
    let apiUrlOne=await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${API_KEY}&number=10&addRecipeInformation=true`)
    console.log(apiUrlOne)
     
    const apiInfo=await apiUrlOne.data.results.map(el=>{
        return{
         id:el.id,
         name:el.title,
         summary:el.summary,
         spoonacularScore:el.spoonacularScore,
         healthScore:el.healthScore,
         image:el.image,
         TypeDiets: el.diets.map((d)=> {return{name:d}}),
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


const getDbInfoId = async () => {
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

const   getAllRecipesId = async() => {
    const apiInfo = await getApiById();
    const dbInfo = await getDbInfoId()
    const allInfo = apiInfo.concat(dbInfo);
  console.log('yo soy ',alliInfo)
    return allInfo;
};

/* const getApiById = async (id) => {
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?${API_KEY1}`)
} */

/* 
const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
} */



/* const   getAllRecipesId = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dbInfo);
   // console.log(apiInfo)
    return allInfo;
}; */
module.exports= {
 
    getAllRecipesId
   
}
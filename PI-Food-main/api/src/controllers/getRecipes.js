const axios= require('axios');
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY } = process.env;


const  getApiInfo=async()=>{
    let apiUrlOne=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    console.log(apiUrlOne)
     
   const apiInfo=await apiUrlOne.data.results.map(el=>{
       return{
        id:el.id,
        title:el.title,
        summary:el.summary,
        spoonacularScore:el.spoonacularScore,
        healthScore:el.healthScore,
        image:el.image,
        typeDiets: el.diets.map((d)=> {return{name:d}}),
        analyzedInstructions: el.analyzedInstructions
        /*typeDiets: el.typeDiets.map(el => el.name)*/
        
    }})
   
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
    getAllRecipes
}
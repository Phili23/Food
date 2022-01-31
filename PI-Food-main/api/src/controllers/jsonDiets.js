
const axios=require('axios')
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY } = process.env;
const {temps} = require('../controllers/jsonDiets');

let diets = [{name: 'gluten free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'lacto-vegetarian'},
{name: 'lacto ovo vegetarian'},{name: 'vegan'},{name: 'pescatarian'},{name: 'paleolithic'},{name: 'primal'},
{name: 'whole 30'}];



const  getApiInfo=async()=>{
    let apiUrlOne=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`)
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
   console.log('yo soy apiInfo',apiInfo)
    return apiInfo;
}



async function getAllDietss() {
    // devuelvo solo los temperamentos
        
    let dietList = allData.flatMap((el) => {
        console.log('yo soy listas la dietas', el.dietList)
        console.log('yo soy typos de dietas', el.typeDiets)
     /*  return el.typeDiets; */
    });

    TypeDiet.bulkCreate(dietList) 
    console.log('base de datos cargada')
}         

 
    
module.exports = { 
getApiInfo,
getAllDietss 
}
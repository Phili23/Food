const initialState = {
   foods:[],
   allFoods:[],
   details:[],
   type:[]
  }
  

  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_FOOD':
        return {
          ...state,
          foods: action.payload,
          allFoods: action.payload
        }
      
      case 'FOOD_NAME':
        console.log('yo soy action payload', action.payload)
        return{
          ...state,
          foods: action.payload,
        }
        case 'GET_DETAILS':
          console.log('yo soy action payload', action.payload)
          return{
            ...state,
            details: action.payload
          }
          case 'POST_DOGS':

            return {
              ...state,
            }
            case 'TYPE_DIETS':
          console.log('yo soy action typeDiets payload', action.payload)
          return{
            ...state,
            type: action.payload
          }
          case 'ORDER_RECIPES':
            const orderName = action.payload === 'asc' ?
            state.foods.sort(function(a, b) {
              if(a.title.toLowerCase() > b.title.toLowerCase()) {
                  return 1;
              }
              if(b.title.toLowerCase() > a.title.toLowerCase()) {
                  return -1;
              }
              return 0;
          }) :
          state.foods.sort(function(a, b) {
              if(a.title.toLowerCase() > b.title.toLowerCase()) {
                  return -1;
              }
              if(b.title.toLowerCase() > a.title.toLowerCase()) {
                  return 1;
              }
              return 0;
          });
          return {
              ...state,
              foods: orderName
          }

          case 'ORDER_HEALTHSCORE':
          const orderScore = action.payload === 'asc' ?
            state.foods.sort(function(a, b) {
              if(a.healthScore > b.healthScore) {
                  return 1;
              }
              if(b.healthScore > a.healthScore) {
                  return -1;
              }
              return 0;
          }) :
          state.foods.sort(function(a, b) {
              if(a.healthScore > b.healthScore) {
                  return -1;
              }
              if(b.healthScore > a.healthScore) {
                  return 1;
              }
              return 0;
          });
          return {
              ...state,
              foods: orderScore
          }

        case 'FILTER_DIETS':
          var foodFilter = state.allFoods; // 
          console.log('yo soy filtro de diets',foodFilter)
          var dietFilter = [];
    
          if (action.payload === "All") {
            dietFilter = foodFilter;
          } else {
            for (let i = 0; i < foodFilter.length; i++) {
              if (foodFilter[i].typeDiets) {
                var diet = foodFilter[i].typeDiets;
                if (diet.includes(action.payload)) {
                  dietFilter.push(foodFilter[i]);
                }
              }
            }
          }
          console.log('yo soy filtro de diets',dietFilter)
          return {
            ...state,
            foods: dietFilter, //guardo los dogs filtrados en el estado filtrado, no toco allDogs
          };
    
        default:
      return state;
    }
    
    
  }
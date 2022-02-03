const initialState = {
   foods:[],
   allFoods:[],
   details:[]
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
        default:
      return state;
    }
    
    
  }
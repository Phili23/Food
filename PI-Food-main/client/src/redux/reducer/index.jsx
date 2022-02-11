const initialState = {
  foods: [],
  allFoods: [],
  details: [],
  typed: [],
  loading: false
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
      return {
        ...state,
        foods: action.payload,
      }
    case 'GET_DETAILS':
      return {
        ...state,
        details: action.payload
      }
    case 'POST_DOGS':
      return {
        ...state,
      }

    case 'FILTER_DIETS':

      const allRec = state.allFoods
      // const allRec = state.recipes
      console.log(allRec);

      const typeDietFilter = action.payload === 'All' ? allRec : allRec.filter(t => t.typeDiets.find(e => e.name === action.payload))
      console.log(action.payload);

      return {
        ...state,
        foods: typeDietFilter

      }
    // }})
    case 'GET_TYPE_DIETS':
      return {
        ...state,
        typed: action.payload
      }
    case 'ORDER_RECIPES':
      const orderName = action.payload === 'asc' ?
        state.foods.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        }) :
        state.foods.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      return {
        ...state,
        foods: orderName
      }
    /*3254,3411*/
    case 'ORDER_HEALTHSCORE':
      const orderScore = action.payload === 'asc' ?
        state.foods.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return 1;
          }
          if (b.healthScore > a.healthScore) {
            return -1;
          }
          return 0;
        }) :
        state.foods.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return -1;
          }
          if (b.healthScore > a.healthScore) {
            return 1;
          }
          return 0;
        });
      return {
        ...state,
        foods: orderScore
      }

    case 'FILTER_CREATED':
      const createdFilter = action.payload === 'created' ? state.allFoods.filter(i => i.created) :
        state.allFoods.filter(el => !el.created)
      return {
        ...state,
        foods: action.payload === 'All' ? state.allFoods : createdFilter
      }
      case 'LOADING':
        return {
            ...state,
            loading: true
        }

    case 'NEXT_PAGE': 
      return {
        ...state,
        foods: action.payload

      };

    case 'PREV_PAGE':
      return {
        ...state,
        foods: action.payload

      }

    case 'MOSTRAR_ALERTA': {
      return state

    }
    default:
      return state;
  }


}
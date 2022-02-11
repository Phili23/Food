import axios from 'axios'

export default function getFood() {
    return async function (dispatch) {
        return axios.get('http://localhost:3001/Recipes')
            .then((res) => {
                dispatch({
                    type: 'GET_FOOD',
                    payload: res.data
                })
            })
            .catch((err) => {
                return err
            })
    }
}


export function foodName(name) {
    console.log('yo soy el payload', name)
    return async function (dispatch) {
        return axios.get('http://localhost:3001/Recipes?name=' + name)
            .then((res) => {
                dispatch({
                    type: 'FOOD_NAME',
                    payload: res.data
                })
            })
    }
}
/*
export function getDetail(id) {
     return async function (dispatch) {
                return axios
            .get('http://localhost:3001/Recipes/' + id)
            .then((res) => {
                dispatch({
                    type: 'GET_DETAILS',
                    payload: res.data
                })
            })
    }
} 

*/
export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/Recipes/' + id)
            console.log(json.data, 'hola json')
            dispatch({

                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//agregar una receta
export function postFood(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/Recipes', payload);

        return response;
    }
}

/*
    export function postFood(payload){
        console.log('yo soy id',payload)
        return async function(dispatch){
            console.log('yo soy id',payload)
            return axios
            .post('http://localhost:3001/Recipes/'+payload)
            .then((res)=>{
                dispatch({
                    type:'GET_DETAILS',
                    payload:res.data
                })
        })
        }
        } */


export function getTypes() {
    return async function (dispatch) {
        try {
            return axios
                .get('http://localhost:3001/TypeDiets/')
                .then((res) => {
                    dispatch({
                        type: 'GET_TYPE_DIETS',
                        payload: res.data
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }
}


export function recipesOrder(payload) {
    return {
        type: 'ORDER_RECIPES',
        payload
    }
}

export function healthOrder(payload) {
    return {
        type: 'ORDER_HEALTHSCORE',
        payload
    }
}


export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function filterTypeDiets(payload) {
    return {
        type: 'FILTER_DIETS',
        payload
    }
}


export const loading = () => {
    return (dispatch) => {
      dispatch({
        type: "LOADING",
      });
    };
  };

export function nextPage() {
    return {
        type: 'NEXT_PAGE'
    }
}



export function mostrarAlerta(msg, categoria) {

    return function (dispatch) {
        dispatch({
            type: 'MOSTRAR_ALERTA',
            payload: msg, categoria
        });
    };
};



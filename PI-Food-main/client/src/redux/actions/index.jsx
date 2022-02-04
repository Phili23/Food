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


export function foodName(title) {
    console.log('yo soy el payload', title)
    return async function (dispatch) {
        return axios.get('http://localhost:3001/Recipes?title=' + title)
            .then((res) => {
                dispatch({
                    type: 'FOOD_NAME',
                    payload: res.data
                })
            })

    }
}

export function getDetail(id) {
    console.log('yo soy id', id)
    return async function (dispatch) {
        console.log('yo soy id', id)
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


export function postFood(payload) {
    return async function (dispatch) {
        var json = await axios.post('http://localhost:3001/Recipes', payload)
        return json;
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
        return axios
            .get('http://localhost:3001/TypeDiets/')
            .then((res) => {
                dispatch({
                    type: 'GET_TYPEDIETS',
                    payload: res.data
                })
            })
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

export function filterTypeDiets(payload) {
    console.log('yo soy payload de filer', payload)
    return {
        type: 'FILTER_DIETS',
        payload

    }

}

import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../redux/actions';

export default function Detail(props) {

   const dispatch = useDispatch()
   const { id } = useParams()   //la obtengo con este hook, porquue en el routa de mi App le especifico

   useEffect(() => {
      dispatch(getDetail(id));//traigo el estado detail
   }, [])

   
   const detailsstate = useSelector((state) => state.details)//le traigo desde el reducer

   return (
      <div>
       
     { 
       detailsstate.length > 0 ? 
       
       <div > 
           <Link to='/home'><button >Back to main Page </button> </Link>
           <h1 > {detailsstate[0].title} </h1>
           <img src={detailsstate[0].image ? detailsstate[0].image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
           <h3 >Type Diet: {detailsstate[0].typeDiets.map(t => t.name).join( ' , ')}</h3>
           {/* <h4 >Dish Type: {detailsstate[0].dishTypes ? detailsstate[0].dishTypes.map(d => d.name) :'dish type not found'  }</h4> */}
           <h5 >summary: {detailsstate[0].summary}</h5>
           <h5 >healthScore: {detailsstate[0].healthScore}</h5>
           <h5 >puntutation: {detailsstate[0].spoonacularScore}</h5>
           <h5>steps:  { Array.isArray(detailsstate[0].steps) ? detailsstate[0].steps.map(e => e.steps.map(f => f.step)) : detailsstate[0].steps }</h5>
       </div> : 
       
       <div> <h2> loading... </h2> </div>

    }
        </div>
    )
}
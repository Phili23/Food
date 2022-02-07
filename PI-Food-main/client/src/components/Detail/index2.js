import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../redux/actions';

export default function Detail(props) {

   const dispatch = useDispatch()
   const { id } = useParams()   //la obtengo con este hook, porquue en el routa de mi App le especifico

   useEffect(() => {
      dispatch(getDetail(id));//traigo el estado detail
   }, [id, dispatch])

   function handleClick(id) {
      dispatch(getDetail(id));
   }

   const myFoods = useSelector((state) => state.details)//le traigo desde el reducer

   return (
      <div className=''  >
         <Link to='/home'>
            <button className='' onClick={e => { handleClick(e) }} >Go to Home</button>
         </Link>
         <br />
         <h1 className="">Food Detail</h1>

         <span className=''>
            {
               myFoods.length > 0 ?
                  <div className=''  >

                     <img className='' src={myFoods[0].image ? myFoods[0].image : myFoods[0].image} alt="" width="190px" height="190px" />
                     <h6>Name:<br />{myFoods[0].name}  </h6>
                        <h6>Diets:  {myFoods[0].typeDiets ? myFoods[0].typeDiets.map(el => el.name) : myFoods[0].diets.map((el, index) => <p key={index} >{el.name ? el.name : el}</p>)}</h6>
                        <h6>Summary:<br />{myFoods[0].summary}  </h6>
                        <h6 >spoonacularScore:{myFoods[0].spoonacularScore} </h6>  <h6 >healthScore:{myFoods[0].healthScore}</h6>
                        <h6 >steps:<br />{myFoods[0].steps && <p>{myFoods[0].steps}</p>}  </h6>
                   
                  </div > :
                  <span className=''>
                <p >Loading...</p></span>
            }
         </span>
      </div>
   )
}
    
             /* image={c.img? c.img:c.image} typeDiets */
              /**img cosas de la api...back image diets */

/*  <h3>Ge:</h3>{myFoods[0].typeDiets?.map((el, index)=> <p key={index} >{el.name ? el.name : el}</p>)}</> */ 
/* <h5 >healthScore:{myFoods[0].steps}</h5> */ 



import React,{ useEffect} from 'react'
import {Link,useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { getDetail } from '../../redux/actions';

export default function Detail(props){
 console.log(props)
 
 const dispatch=useDispatch()
 const {id} = useParams()   //la obtengo con este hook, porquue en el routa de mi App le especifico

 
 useEffect(()=>{
   dispatch(getDetail(id));//traigo el estado detail
},[id, dispatch])


function handleClick(id) {
     dispatch(getDetail(id));
 }
  
const myFoods=useSelector((state)=>state.details)//le traigo desde el reducer


return(
   
    <div className=''  >
         <Link to='/home'>
           
           <button className=''  onClick={e => { handleClick(e) }} >Go to Home</button>
        </Link> 
        
    <br/>
      <h1 className="">Food Detail</h1>
      
      
           <br/>
           <br/>
         <span className=''>
        {
            myFoods.length>0?
            <div className=''  >
             
                 <img className='' src={myFoods[0].image? myFoods[0].image:myFoods[0].image} alt="" width="190px" height="190px"/> 
                 <div  className=''>
                 <h4 className=''>{myFoods[0].title}</h4><h4 >Diets:  </h4>  
                 {myFoods[0].diets.map(el=>el.name + ('  '))}  
                 <h6>Summary:<br/>{myFoods[0].summary}  </h6>
                 <h5 >spoonacularScore:{myFoods[0].spoonacularScore} </h5>   
                 <h5 >healthScore:{myFoods[0].healthScore}</h5>
                 <h6 >steps:<br/> {myFoods[0].steps?.replace(/<[^>]*>?/g, '')}</h6>
                 </div> 
               
           </div >:
           <span className=''>
           <p >Loading...</p></span>
        }
        </span>
      
        <br/>
        <br/>
       
     </div>
)
}
import React, { useEffect } from "react";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getFood from "../../redux/actions";
import Card from "../Card";
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";

import './index.css'

export default function Home(){

    const allFoods=useSelector(state=>state.foods)
    const dispatch = useDispatch(); //despachando las acciones
    const[currentPage,setCurrentPage]=useState(1)
    const[foodPerPage, setFoodPerPage]=useState(9)
    const indexOfLastFood=currentPage*foodPerPage//
    const indexOfFirstFood=indexOfLastFood-foodPerPage;//0

    const currentFoods=allFoods.slice(indexOfFirstFood, indexOfLastFood)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      useEffect(()=>{
          dispatch(getFood())
      },[dispatch])
      
    function handleClick(e) {
    e.preventDefault();
    dispatch(getFood(e))
    setCurrentPage(1)
   }

    return(
        <div>
           <> <h1>FOODS</h1></>
           <> <button onClick={e => { handleClick(e) }}>Reload all Food</button></>
<br/>
    <select className='' >
        <option value="" > Order ..By Foods</option>
        <option value="Asc">Ascendente</option>
        <option value="Desc">Descendente</option>
      </select>
       <select className='' >
        <option value="" > Order ..By Foods-healthScore</option>
        <option value="Asc">Ascendente</option>
        <option value="Desc">Descendente</option>
      </select> 
      <select className="" >
        <option value='All'>Filter By TypeDiets</option>
       {/*  {allTemperaments.sort().map((g, el) => <option key={el.id} value={g.name}>{g.name}</option>)} */}

      </select> 
       
           <Paginado
        foodPerPage={foodPerPage}
        allFoods={allFoods.length}
        paginado={paginado} />
        
           <SearchBar/>
    <div  className='card-container12s'>
 
         {
         currentFoods?.map((el)=>{
          return(
            <Link to={'/home' + el.id}  >
                  <Card title={el.title}
                  image={el.image}
                  typeDiets={ currentFoods[0].diets.map(el=>el.name + ('  '))}  
                 /*  typeDiets={currentFoods[0].diets.length !== 0? currentFoods[0].diets.map(diet => Object.values(diet)).join(", ").toLowerCase(): "Not available"} */
                /*  typeDiets={currentFoods[0].typeDiets.map(i => i.name + (', '))  } */
                     />
               </Link>
          )
      })
  }
  </div>


       </div>


    )
}

/*  {currentFoods[0].diets ? currentFoods[0].typeDiets.map(d => d.name) :'dish type not found'  } */
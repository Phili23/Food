import React, { useEffect } from "react";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getFood from "../../redux/actions";
import { recipesOrder, healthOrder,filterTypeDiets } from "../../redux/actions";
import Card from "../Card";
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";

import './index.css'

export default function Home(){

    const allFoods=useSelector(state=>state.foods)
    const allTypes=useSelector(state=>state.type)
    console.log('yo soy dietes',allFoods)
    console.log('yo soy filtrodietes',allTypes)

    const dispatch = useDispatch(); //despachando las acciones
    const [order, setOrder] = useState('');
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

   function handleRecipesOrder(e) {
    e.preventDefault();
    dispatch(recipesOrder(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
   }

   function handleHealtOrder(e) {
    e.preventDefault();
    dispatch(healthOrder(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
   }

   useEffect(()=>{
    dispatch(filterTypeDiets())
},[dispatch])

   function handleDietsFilter(e) {
    e.preventDefault();
    dispatch(filterTypeDiets(e.target.value))
    console.log('yo soy filtro de diets',e.target.value)
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
   }

    return(
        <div>
           <> <h1>FOODS</h1></>
           <>
           <Link to ='/create'> <button>Create Food Recipe</button></Link>
           </>
           <>
           <Link to ='/'> <button>Back</button></Link>
           </>
           <> <button onClick={e => { handleClick(e) }}>Reload all Food Recipes</button></>
<br/>
    <select className='' value={order}  onChange={e => {handleRecipesOrder(e) }}>
        <option value="" > Order ..By Foods</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
       <select className='' value={order}  onChange={e => {handleHealtOrder(e) }} >
        <option value="x" > Order ..By Foods-healthScore</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select> 

      <select className="" onChange={e => { handleDietsFilter(e) }}>
        <option value='All'>Filter By TypeDiets</option>
      {allTypes.map((g, el) => <option key={el.id} value={g.name}>{g.name}</option>)}

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
                  healthScore={el.healthScore}
                  typeDiets={ currentFoods[0].diets.map(el=>el.name + (' - '))}  
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
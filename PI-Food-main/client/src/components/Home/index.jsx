/* https://app-food.vercel.app/food/home */
/* https://github.com/Dufainder/PI-Food */

/*
{currentFoods[0].diets ? currentFoods[0].diets.map(el => el.name) : currentFoods[0].typeDiets.map((el, index) => <p key={index} >{el.name ? el.name : el}</p>)} */
//{currentFoods[0].typeDiets ? currentFoods[0].typeDiets.map(el => el.name) : currentFoods[0].diets.map((el, index) => <p key={index} >{el.name ? el.name : el}</p>)} */
//typeDiets=  { currentFoods[0].diets? currentFoods[0].diets.map(el =>< p key={index} el.name)></p>: currentFoods[0].typeDiets.map((el, index)=> <p key={index} >{el.name ? el.name : el}</p>)} */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getFood from "../../redux/actions";
import { recipesOrder, healthOrder, filterTypeDiets, filterCreated, getTypes, } from "../../redux/actions";
import Card from "../Card";
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";
import './index.css'

export default function Home() {

  const allFoods = useSelector(state => state.foods)
  const allTypes = useSelector(state => state.typed)


  const dispatch = useDispatch(); //despachando las acciones


  const [order, setOrder] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [foodPerPage, setFoodPerPage] = useState(9)
  const indexOfLastFood = currentPage * foodPerPage//
  const indexOfFirstFood = indexOfLastFood - foodPerPage;//0

  const currentFoods = allFoods.slice(indexOfFirstFood, indexOfLastFood)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    console.log('yo soy', allFoods.length)
    console.log('yo soy current Page', currentPage)
    if (allFoods.length > currentPage + 9) {
      setCurrentPage(currentPage + 1);
    }
  };


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    dispatch(getFood())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

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



  function handleDietsFilter(e) {
    e.preventDefault();
    console.log('yo soy target.valeu', e.target.value)
    dispatch(filterTypeDiets(e.target.value))
    setCurrentPage(1)
    setFilter(`Filtrado ${e.target.value}`)
  }

  function handleFilterCreated(e) {
    e.preventDefault()
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  };


  return (
    <div>
      <> <h1 className="title">Foods Recipes</h1></>
      <>
        <Link to='/create'> <button className="butt">Create Food Recipe</button></Link>
      </>
      <>
        <Link to='/'> <button className="butt">Back</button></Link>
      </>
      <> <button className="butt" onClick={e => { handleClick(e) }}>Reload all Food Recipes</button></>
      <br />
      <select className='' value={order} onChange={e => { handleRecipesOrder(e) }}>
        <option value="" > Sort by Recipe Name</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <select className='' value={order} onChange={e => { handleHealtOrder(e) }} >
        <option value="x" >Sort ..By Recipes-healthScore</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <select className="" onChange={e => { handleDietsFilter(e) }} value={filter}>
        <option value='All'>Filter By TypeDiets</option>
        {allTypes.map((g, el) => <option key={el.id} value={g.name}>{g.name}</option>)}


      </select>
      <select className='titulos3' value={order} onChange={e => handleFilterCreated(e)}>
        <option >Filter By Origin</option>
        <option value='All'>All Recipes</option>
        <option value='created'>My Recipes</option>
        <option value='Api'>Api Recipes</option>
      </select>

      <Paginado
        foodPerPage={foodPerPage}
        allFoods={allFoods.length}
        paginado={paginado} />


      < button className="butt3" onClick={nextPage}>nexPage</button>
      < button className="butt3" onClick={prevPage}>prevPage</button>

      <br /><br />
      <SearchBar />
      <br />
      <div className='card-container12s'>

        {currentFoods?.map((el) => {
          return (
            <div key={el.id} className='starp' >
              <Link to={'/home' + el.id} >
                <Card name={el.name}
                  image={el.image ? el.image : <img src='https://i0.wp.com/revistadiners.com.co/wp-content/uploads/2020/07/portada_rutaazteca_1200x800.jpg?fit=1024%2C683&ssl=1' alt=" " />}
                  healthScore={el.healthScore}
                  typeDiets={el.typeDiets.map(e => e.name).join(' , ')} />
              </Link>
            </div>
          )

        })
        }

      </div>
    </div>
  )
}

/*  {currentFoods[0].diets ? currentFoods[0].typeDiets.map(d => d.name) :'dish type not found'  } */

/* image={c.img? c.img:c.image} typeDiets */
/**img cosas de la api...back image diets */

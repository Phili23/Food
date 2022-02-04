
import { postFood } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { getTypes, PostFood } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {Link } from "react-router-dom";



export default function PostRecipes(params) {

    const type = useSelector((state) => state.type); 
  /*   console.log('yo soy dietes',type)
 */
    const dispatch = useDispatch("")


    
    function handleChange(e) {
        /*   e.preventDefault(); */
        console.log('yo soy target.value',e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
      /*   setErrors(validate({ ...input, [e.target.name]: e.target.value })) */
    }


        
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postFood(input))
        alert("Succesfull...Recipe Created")

    }
    const [input, setInput] = useState({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        image: "",
        typeDiets: [],
        steps: "",
    })
    /* 
      useEffect((e)=>{
          dispatch(PostFood(e))
      },[dispatch]) */

    useEffect((e) => {
        dispatch(getTypes())
    }, []) 

    function handleSelectT(e) { // cada vez q  se agrega un temp
        e.preventDefault();
        console.log('yo soy target value',e.target.value)
        setInput({
            ...input,
            typeDiets: [...input.typeDiets, e.target.value],/// este es el array vacio..le va a concatenar el targe.valu
        })
       /*  setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        })) */
    }


    return (

        <div>

            <Link className="" to='/home'><button className=''>Back-Home</button></Link>
            <h1> Create Food Recipes</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label className="style">Title</label>
                    <input className=''
                        type="text"
                        value={input.title}
                        name="title"
                        placeholder='Title...'
                        onChange={(e) => handleChange(e)}
                    />

                </div>

                <div className="">
                    <label className="">Summary</label>
                    <input className=''
                        type="text"
                        value={input.summary}
                        name=" summary"
                        placeholder='Summary....'
                        onChange={(e) => handleChange(e)}
                    />

                </div>
                <div className="">
                    <label className=""> Steps</label>
                    <input className=''
                        type="text"
                        value={input.steps}
                        name=" steps"
                        placeholder='Steps....'
                        onChange={(e) => handleChange(e)}
                    />

                </div>

                <div className="">
                    <label className=""> SpoonacularScore</label>
                    <input className=''
                        type="num"
                        value={input.spoonacularScore}
                        name=" spoonacularScore"
                        placeholder=' spoonacularScore....'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="">
                    <label className="">HealthScore</label>
                    <input className=''
                        type="num"
                        value={input.healthScore}
                        name="healthScore"
                        placeholder='HealthScore....'
                        onChange={(e) => handleChange(e)}
                    />

                </div>

 
               <div className="">
                        <label className="">Image  </label>
                        <input
                            type="text"
                            value={input.image}
                            name='image'
                            placeholder='url...'
                            onChange={(e) => handleChange(e)}
                             />
                    </div>
                    
                    <div className="">
                        <label className="">Types of Diets  </label>
                        <select onChange={(e) => handleSelectT(e)} className="" required>
                            <option >All Diets</option>
                            {type.map((temp, item) => (
                                
                                <option value={temp.name}  >{temp.name}</option>
                               ))}

                            {/* {errors.temperament && (<p className='error' > {errors.temperaments} </p>)} */}
                        </select>
                    </div> 

                    {/* <div className="">
                        <label className="">Types of Diets  </label>
                        <select onChange={(e) => handleSelectT(e)} >
                            <option >All Diet</option>
                            {type?.map((diet) => (
                                
                                <option key={diet.name}  name={diet.name} value={diet.name}   >{diet.name}</option> 
                               ))}
                        
                        </select>
                    </div>  */}
                    <>
                    <button type="submit">Create Food Recipe</button>
                    </>


            </form>

        </div>
    )

}
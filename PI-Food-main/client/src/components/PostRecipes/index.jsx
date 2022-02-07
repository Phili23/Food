import React, { useEffect, useState } from "react";
import { getTypes, postFood } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";


export default function PostRecipes(params) {
    const history = useHistory()//para redirigir a alguna ruta */
    const diets = useSelector((state) => state.typed);
    /*   console.log('yo soy typedietes', TYPEDdiets) */

    const dispatch = useDispatch("")
    /*  const history = useHistory()//para redirigir a alguna ruta */


    const [input, setInput] = useState({
        name: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        image: "",
        steps: [],
        typeDiets: [],
    })

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postFood(input))
        alert('New recipe added successfully!')
        setInput({
            name: "",
            summary: "",
            spoonacularScore: "",
            healthScore: "",
            image: "",
            steps: [],
            typeDiets: [],

        })
        history.push('./home')//redirije a una direccion 
    }


    useEffect((e) => {
        dispatch(getTypes())
    }, [dispatch])


    function handleChange(e) {
        /*   e.preventDefault(); */
        console.log('yo soy target.value', e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value,//
        })
        /*   setErrors(validate({ ...input, [e.target.name]: e.target.value })) */
    }

    function handleSelectT(e) {
        e.preventDefault();
        setInput({
            ...input,
            typeDiets: [...input.typeDiets, e.target.value],/// este es el array vacio..le va a concatenar el targe.valu
        })
    }


    function handleDelete(el) {
        setInput({
            ...input,
            typeDiets: input.typeDiets.filter((t) => t !== el)

        });
    }

    //diets de la Api y TypeDiets...los creados por mi
    return (
        <div>
            <Link className="" to='/home'><button className=''>Back-Home</button></Link>
            <h1> Create Food Recipes</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label className="style">Name:  </label>
                    <input className=''
                        type="text"
                        value={input.name}
                        name="name"
                        placeholder='Name...'
                        onChange={(e) => handleChange(e)}
                    />
                </div>


                <div className="">
                    <label className="style">Summary:  </label>
                    <input className=''
                        type="text"
                        value={input.Summary}
                        name="summary:"
                        placeholder='Summary...'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="">
                    <label className="style">Steps:  </label>
                    <input className=''
                        type="text"
                        value={input.steps}
                        name="steps"
                        placeholder='Steps...'
                        onChange={(e) => handleChange(e)}
                    />
                </div>


                <div className="">
                    <label className=""> SpoonacularScore:  </label>
                    <input className=''
                        type="number"
                        value={input.spoonacularScore}
                        name="spoonacularScore"
                        placeholder=' SpoonacularScore....'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="">
                    <label className="">HealthScore:  </label>
                    <input className=''
                        type="number"
                        value={input.healthScore}
                        name="healthScore"
                        placeholder='HealthScore....'
                        onChange={(e) => handleChange(e)}
                    />
                </div>


                <div className="">
                    <label className="">Image:  </label>
                    <input
                        type="text"
                        value={input.image}
                        name='image'
                        placeholder='url...'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="">
                    <label className="">Diets:  </label>
                    <select onChange={(e) => handleSelectT(e)} className="" required>
                        <option >All Diets</option>
                        {diets.map(temp => (
                            <option value={temp.name} key={temp.id} >{temp.name}</option>
                        ))}
                    </select>
                </div>

                <span className="">
                    <button type='submit' className="">Created Food Recipe</button>
                </span>

            </form>
            {
                input.typeDiets.map((el, i) =>
                    <div key={i}>
                        <button onClick={() => handleDelete(el)}>x</button>
                        <p>{el}</p>
                    </div>)
            }
        </div>
    )

}

/* image={c.img? c.img:c.image} */
/**img cosas de la api...back image */
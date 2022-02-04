/* import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { foodName } from "../../redux/actions";

export default function SearchBar() {

const dispatch=useDispatch()
const[title, setTitle]=useState('')

function handleImputChange(e){
    e.preventDefault()
    setTitle(e.target.value)    
}

function handleSubmit(e) {// cdo se presiona Buscar, se despacha la accion p/ buscar en la api x name
    e.preventDefault()
    dispatch(foodName(title))
    setTitle('');
}
    return(
    <div>
        <input 
        type="text"
        placeholder= 'Buscar...' required
        onChange = {(e) => handleImputChange(e)}
    />
    <button type='submit' onClick={ (e) => handleSubmit(e)}>Search...</button>
</div>

    )
} */


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { foodName } from "../../redux/actions";


export default function SearchBar() {
    const dispatch = useDispatch()
    // se va guardando lo que el usuaario esta ingresando
    const [name, setName] = useState("")

    //
    function handleInputChange(e) { //cdo hay un cambio en el input, lo va renderizando
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {// cdo se presiona Buscar, se despacha la accion p/ buscar en la api x name
        e.preventDefault()
        dispatch(foodName(name))
        setName("");
    }

    return (
        <div >
            <input className="titulos"
                type='text'
                placeholder="Buscar..." required
                value={name}
                onChange={(e) => { handleInputChange(e) }}

            />
            <button className="titulos" type="submit" onClick={(e) => { handleSubmit(e) }}>Search...</button>
        </div>
    )
}
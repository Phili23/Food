import React from "react";
import './index.css'


export default function Card({ id, name, summary, spoonacularScore, healthScore, image, typeDiets, steps, created }) {

    return (
        <div className="">
            <div key={id} className="">
          <span className="">{image ? <img className="imga" src={image} alt="not found" /> : <img className="imga1"  src='https://i0.wp.com/revistadiners.com.co/wp-content/uploads/2020/07/portada_rutaazteca_1200x800.jpg?fit=1024%2C683&ssl=1' alt=" " width="100px" alt="not found" />}<br/></span> 
                
           <div className=''>
              <span className="nameFood"> <h5>  <br />{name}</h5></span><br/>
         
           
            
             <span> <h5 className="recipeType"> Type of Diet:<br/>  {typeDiets} </h5></span>
             
            
             <span> <h6  className="recipe">HealthScore:  {healthScore}</h6></span>
        </div>
        </div>
        </div>

    )
}
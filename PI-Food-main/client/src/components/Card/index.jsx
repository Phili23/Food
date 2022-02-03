import React from "react";


export default function Card({ id,title,summary,spoonacularScore, healthScore, image,typeDiets,steps,created}) {
    
    return(
<div>
    <div key={id}>
    <img src={image} alt="img not found" width="350px" height="250px"/>
    <h4> Title <br/>{title}</h4>
    </div>
     <div>
     <h5>Diets: <br/>{typeDiets}</h5></div> 
    
</div>

    )
}
import React from "react";


export default function Card({ id,title,summary,spoonacularScore, healthScore, image,typeDiets,steps,created}) {
    
    return(
<div>
    <div key={id}>
    <img src={image} alt="img not found" width="350px" height="250px"/>
    <h5> Title <br/>{title}</h5>
    </div>
     <div>
     <h6>Diets: <br/>{typeDiets}</h6></div> 
     <div>
     <h6>HealthScore: <br/>{healthScore}</h6></div> 
     

    
</div>

    )
}
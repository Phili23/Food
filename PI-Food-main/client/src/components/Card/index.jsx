import React from "react";


export default function Card({ id, name, summary, spoonacularScore, healthScore, image, typeDiets, steps, created }) {

    return (
        <div>
            <div key={id}>
                <img src={image} alt="img not found" width="350px" height="250px" />
                <h5> Name <br />{name}</h5>
            </div>
           
              {/*   <h6>Diets: <br />{typeDiets}</h6></div> */}
              <h5> Diet </h5>  {typeDiets} 
            
                <h6>HealthScore: <br />{healthScore}</h6>
        </div>
    )
}
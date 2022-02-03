import React from "react";



export default function Paginado({foodPerPage, allFoods, paginado}){
    const pageNumbers=[]

   for(let i=1;i<=Math.ceil(allFoods/foodPerPage);i++){
       pageNumbers.push(i);
   }
   return(
       
           <div className="pagination" >
            <ul className='ul' >
                           { pageNumbers && 
               pageNumbers.map(number=>(
                   <span key={number}>

                                     
                <button className="button" onClick={()=> paginado(number)}>{number}</button>
                             
               
                </span>
                
               ))}
           </ul>
           </div>
    
   ) 
}
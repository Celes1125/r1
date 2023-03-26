import React, { useEffect, useState } from "react"; 


function List (props) {

    const [lista, setLista] = useState("") 

    useEffect (
        ()=>{
            console.log("cambió")
         },
        [lista]
    )

    
    return (
        
        <div>
           <div>{lista}</div>
           <button onClick={()=>{setLista("hola hola mostrando lista")}}>Mostrar Lista</button>
           <button onClick={()=>{setLista("")}}>Ocultar Lista</button>


        </div>
        

    )  


}
export default List;



import React from "react";
import { Link } from "react-router-dom";


function Noticia (props){

    const {title, body, id} = props.pasamano;
    const verDetalle = props.verDetalle!==false?true:false // si verDetalle llega hasta aquí con valor distinto de false, entonces verDetalle aquí es true, si no, es false.




return (
    <div>
        
        <h1>{title}</h1>
        <p>{body}</p>

        {
            verDetalle &&
                <button> 
                    <Link to={"/noticias/" + id} >ver detalle</Link>
                </button>
        
        }       
        
        
    </div>
    
)

}

export default Noticia;
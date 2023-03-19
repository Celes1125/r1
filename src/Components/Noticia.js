import React from "react";
import { Link } from "react-router-dom";


function Noticia (props){

return (
    <div>
        
        <h1>{props.pasamano.title}</h1>
        <p>{props.pasamano.body}</p>
        
        <button> 
            <Link to={"/noticias/" + props.pasamano.id} >ver detalle</Link>
        </button>
        ..............
        
    </div>
    
)

}

export default Noticia;
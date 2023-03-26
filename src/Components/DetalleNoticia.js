import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import Noticia from "../Components/Noticia";


function DetalleNoticia(props){ 
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [noticia, setNoticia] = useState ({});
    
    useEffect(
        ()=>{
        fetch("https://jsonplaceholder.typicode.com/posts/"+id)
        .then(res=>res.json())
        .then(data=>{
            console.log("data", data);
            setLoading(false);
            setNoticia(data)           

        })
        },
        []
    )

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }else{
        return (
            <div>
                <Noticia pasamano={noticia} verDetalle={false}/>
            </div>
        )
    }

  
}
export default DetalleNoticia;

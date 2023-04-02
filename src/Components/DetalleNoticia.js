import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import Noticia from "../Components/Noticia";
import { getNoticiaById } from "../Services/ItemsServices";

function DetalleNoticia(props){ 
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [noticia, setNoticia] = useState ({});
    
    useEffect(
        ()=>{
        getNoticiaById(id)
        .then(response=>{
            console.log("response", response);
            setLoading(false);
            setNoticia(response.data)           

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

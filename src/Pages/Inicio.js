import React, { useState, useEffect } from "react";
import Noticia from "../Components/Noticia";



function Inicio (props) {    

    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState (true);    

    useEffect (
        ()=>{
         fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=>res.json())
        .then(data=>{console.log("data", data)
        setNoticias(data)
        setLoading(false)
        })},
        []
    )

    if (loading) {
        return (

            <div> 
                Loading...
            </div>       
        ) 

    }else{
        return (

            <div> 
                {noticias.map(n=><Noticia pasamano={n} />)}
            </div>       
        ) 
    }  
}

export default Inicio;
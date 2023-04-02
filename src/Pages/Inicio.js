import React, { useState, useEffect } from "react";
import Noticia from "../Components/Noticia";
import {db} from '../Config/firebase';
import {getAllNoticias} from '../Services/ItemsServices'





function Inicio (props) {    

    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState (true);     
    console.log ("firebase db: ", db);


    useEffect (
        ()=>{
         getAllNoticias()
        .then(response=>{console.log("response", response)
        setNoticias(response.data)// ojo que axios devuelve un response con la propiedad data, y esa prop data es la que efectivamente contiene el array
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
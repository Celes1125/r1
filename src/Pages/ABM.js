import React, { useState, useEffect } from "react";
import {db} from "../Config/firebase";
import { collection, addDoc } from "firebase/firestore";


function ABM (props) {    

    const [product, setProduct] = useState({title:"", price:"", description:""});
        
    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            const responseDocument = await addDoc(collection(db,"products"), {product});
            console.log("responseDocument: ", responseDocument);
            

        }catch(error){
            console.log("error: ", error);
            alert(error.message)

        }

    }
    const handleChange = (event)=> {
        
        const name = event.target.name;
        const value = event.target.value;
        console.log("entré con el handle change", name, value);
        setProduct ({...product,[name]:value})
    }    

    
        return (

            <div> 
                <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input type="text" name="title" value={product.title} onChange={handleChange} ></input>
                </div>
                <div>
                    <label>Precio</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Descripción</label>
                    <input type="text" name="description" value={product.description} onChange={handleChange}></input>
                </div>
                <div>
                    <button type="submit">Submit product</button>
                </div>    

            </form>
                
               
                

                
                
            </div>       
        ) 
    }  


export default ABM;
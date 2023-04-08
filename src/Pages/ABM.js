import React, { useState, useEffect } from "react";
import {db} from "../Config/firebase";
import { collection, addDoc, getDocs, getDocsFromCache, getDocsFromServer} from "firebase/firestore";


function ABM (props) {   
 

    const [product, setProduct] = useState({title:"", price:"", description:""});
    const [productList, setProductList] = useState([]);
   

    
        
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "products"), { product });
            
            console.log("Entró el handle submit para agregar el producto: ", product);


        } catch (error) {
            console.log("error: ", error);
            alert(error.message);

        }

    }
    const handleChange = (event)=> {
        
        const name = event.target.name;
        const value = event.target.value;
        console.log("entré con el handle change", name, value);
        setProduct ({...product,[name]:value})
    }  

    useEffect (
        ()=>{
           const getProductos = async ()=>{
                try {
                    const querySnapshot = await getDocs(collection(db, "products"));
                    setProductList(querySnapshot.docs);    
                    console.log("PRODUCTOS>>>>>", productList)  
                    
                                 
                } catch (e) {
                    console.log("error: ", e);
                    alert(e.message);

                }

            }
            getProductos();      

        },
        [productList]
    )
    
    
    //{productos.map(p=>{p.data().title})};
    
        return (

            <div> 
                <div>
                    
                {productList.map(
                    (doc)=>{
                        return (
                           <div key={doc.id}> {doc.data().product.title}</div>
                        )
                    }
                )}


                </div>

               

                
                    
                
                


                <p>Cargar productos</p>
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
                    <button type="submit">Submit</button>
                </div>    

            </form>
                
               
                

                
                
            </div>       
        ) 
    }  


export default ABM;
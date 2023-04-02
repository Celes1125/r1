import React, {useState} from "react";
import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup (){

    const [form, setForm] = useState({name:"", surname:"", email: "", password:""})

    const handleSubmit = async (event)=>{
        console.log("Objeto form: ", form)    
        event.preventDefault() //evita la recarga natural del evento que refresca la página, corta con la recarga del submit. Esto es un método dentro del parámetro event.
        try {
            const user = await createUserWithEmailAndPassword(auth, form.email, form.password);
            console.log(user)
        }catch (error){
            console.log("error: ", error);
            alert(error.message)

        }
    }      
    const handleChange = (event)=>{  
        const name = event.target.name;
        const value = event.target.value;
        console.log("entré con el handle change", name, value);    
        setForm({...form,[name]:value}) // el spread operator (...form) va a hacer un merge. Aquí con el setForm estamos pidiendo que se arme por completo todo un objeto form nuevo, modificando sólo la propiedad que le indicamos, en este caso, la propiedad name. Si no colocamos este operador, sólo se va a modificar la propiedad correspondiente al evento último inmediato antes del submit, y no todas las propiedades o el objeto completo. 
    }
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Apellido: </label>
                        <input type="text" name="surname" value={form.surname} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>E-mail: </label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Contraseña: </label>
                        <input type="password" name="password" value={form.password} onChange={handleChange}></input>
                    </div>
                    <div>
                    <button type="submit">Signup</button>
                    </div>
                
                </form>               

            </div>
        )
}
export default Signup;
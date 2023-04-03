import React, { useState } from "react";
import { auth} from "../Config/firebase";
import { signInWithEmailAndPassword} from "firebase/auth";

function Login (){
    const [logForm, setLogForm] = useState({email:"", password:"" });

    const handleSubmit = async (event)=>{        
            console.log("handleSubmit", logForm);
            event.preventDefault()        

        try {
            const responseUser = await signInWithEmailAndPassword(auth, logForm.email, logForm.password);
            console.log("responseUser: ", responseUser)
        }catch(error){
            console.log("error: ", error);
            alert(error.message)
        }      


    }

    const handleChange = (event)=> {
        
        const name = event.target.name;
        const value = event.target.value;
        console.log("entré con el handle change", name, value);
        setLogForm ({...logForm,[name]:value})
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={logForm.email} onChange={handleChange} ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={logForm.password} onChange={handleChange}></input>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>    

            </form>
        </div>
    )
}

export default Login;
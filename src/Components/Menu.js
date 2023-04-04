import React from "react";
import {Link} from 'react-router-dom';


function Menu(){
    return (       
        <ul>
            <li> <Link to="/">Inicio</Link></li>
            <li> <Link to="/signup">Sign up</Link></li>
            <li> <Link to="/login">Log in</Link></li>
            <li> <Link to="/list">List</Link></li>
            <li> <Link to="/abm">ABM</Link></li>
        </ul>   
    )
};

export default Menu;
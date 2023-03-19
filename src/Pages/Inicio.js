import React, { Component } from "react";
import Noticia from "../Components/Noticia";



class Inicio extends Component {
    constructor (props){
        super(props);
        this.state = {
            noticias : [],
            loading : true
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=>res.json())
        .then(data=>{
            console.log("data", data);
            this.setState({noticias:data});
            this.setState({loading:false})

        })
    }

    render(){       
        
            return (
                <div>                    
               
                {this.state.noticias.map(n=><Noticia pasamano={n}/>)}




                </div>       
            )           
                         
    }   
 
}

export default Inicio;
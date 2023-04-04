
import './App.css';
import Inicio from './Pages/Inicio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Components/Menu';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import DetalleNoticia from './Components/DetalleNoticia';
import List from './Pages/List';
import ABM from './Pages/ABM';



function App() {

  return (   
    <div>
    
    <Router>
      <Menu/>
    <Routes>     
    <Route path= "/" exact element={<Inicio/>}/>
    <Route path= "/noticias/:id" exact element={<DetalleNoticia/>}/>  
    <Route path= "/signup" exact element={<Signup/>}/>
    <Route path= "/login" exact element={<Login/>}/>  
    <Route path= "/list" exact element={<List/>}/>  
    <Route path= "/abm" exact element={<ABM/>}/>  

       
    
    </Routes>  
    </Router>
   

    </div>     
    
  );
}

export default App;

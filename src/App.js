import React, { Component } from 'react';
import Graph from './components/Graph';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import Equation from './components/Equation';
import Footer from './components/Footer';



function App() {
  

  
    return (
      <div className="App">
        
          <Graph />
          <br/>
          <Footer/>
        
      </div>
      
    )
  
  
}

export default App;

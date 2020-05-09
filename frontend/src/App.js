import  React from 'react';
import  './App.css';
import  './css/NavBar.css';
import  './css/Footer.css';

import  Start  from './Start'
import  NavBar  from './NavBar'
import  Footer  from './Footer'
import  Catalog  from './Catalog'
import  Article  from './Article'

import  { Route } from 'react-router-dom';
import  { BrowserRouter } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
        <BrowserRouter>
          <Route exact component={NavBar}/>


          <Route path="/" exact component={Start} />
          <Route path="/catalog" exact component={Catalog} />          
          <Route path="/Article/:pk" exact component={Article} />


          <Route exact component={Footer}/>

        </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default App;
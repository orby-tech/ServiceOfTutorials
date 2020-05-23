import React, { Component }  from 'react';

import { Link } from 'react-router-dom';


import  Service  from  './Service';
import { FindForm } from './FindCatalog.tsx';
const  service  =  new  Service();

interface ParentState {
  find:string;
  catalog:any[];
  loading:boolean;
}


class Catalog extends Component<{}, ParentState>{
  constructor(props) {
    super(props);


    let catalog : any [] = []
    if(localStorage.getItem('catalog')){
      catalog = JSON.parse(localStorage.getItem('catalog'))
    }
    this.state = {
      catalog: catalog,
      find: null,
      loading: false
    }
  }
  componentDidMount(){
    var  self  =  this;
    service.getCatalog().then(function (result) {
      if(!localStorage.getItem('catalog') || JSON.parse(localStorage.getItem('catalog')) !== result){
        self.setState({ catalog: result })
        localStorage.setItem('catalog', JSON.stringify(result))
      }
      self.setState({ loading: false })
    });
  }


  catalog_finded(temp) {
    temp= temp.toLowerCase()
    let str : string = this.state.find ? this.state.find.toLowerCase() : null
    return temp.indexOf(str) !== -1 ? "catalog__finded-style" : ""
  }




  modStyle(second) {
    if (second[2] && second[2] === "unmod") {
      return "catalog__second-level-unmod"
    } else if (second[2] && second[2] === "noDisplay") {
      return "catalog__second-level-delete"
    } else {
      return "catalog_second-level"
    }
  }


  modInfo(second) {
    if(second[2] && second[2] === "unmod"){
      return " (На проверке)"
    } else if(second[2] && second[2] === "noDisplay"){}
  }  
  displayList(first){
    return( 
      first.map( second  =>
        <div key={second} className={this.modStyle(second)}>
          <Link
          className={this.catalog_finded(second[0])}
          to={"/Article/"+second[1]}>{second[0]}</Link>
          {this.modInfo(second)}
          <div className="catalog__reit" >{"("+second[3]+")"}</div>
          
        </div>
      )
    )
  }
  FindFormHandler = ( title: string ) => {
    this.setState({ find: title })
  }
  
  render() {
    if (this.state.loading) {
      return (
        <>
        <div className="cssload-container">
            <div className="cssload-zenith"></div>
        </div>
        </>
      )
    
    } else return(   
      <>
      <div className="catalog">

        <h1> Каталог </h1>
          <FindForm onAdd={this.FindFormHandler}/>
          <div className="catalog__container">
          { 
            this.state.catalog.map( global  =>
              <div key={global} className="catalog_global-level">
                <h2 className={this.catalog_finded(global[0])}>{global[0]}</h2>
                { 
                  global.slice(1).map( first  =>
                    <div key={first} className="catalog_first-level">
                      <h4 className={this.catalog_finded(first[0])}>{first[0]}</h4>
                      {this.displayList(first[1])}
                    </div>
                  )
                }
              </div>
            )
          }
          </div>

        
      </div>
      </>
    );
  }
}

export default Catalog;
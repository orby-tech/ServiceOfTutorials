import React, { Component }  from 'react';

import { Link } from 'react-router-dom';





class Catalog extends Component{
  constructor(props) {
    super(props);
    this.findClick = this.findClick.bind(this)
    this.state = {
      catalog: [],
      find: null
    }
  }
  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch('http://127.0.0.1:8000/allcatalog', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
          catalog: result
        })
      })
  }
  catalog_finded(temp) {
    temp= temp.toLowerCase()
    let str = this.state.find
      ? this.state.find.toLowerCase()
      : null
    return temp.indexOf(str) !== -1
      ? "catalog__finded-style"
      : ""
  }
  findClick(){
    this.setState({find: document.getElementById("catalog__input-find-group").value})
  }
  modStyle(second) {
    if(second[2] && second[2] === "unmod"){
      return "catalog__second-level-unmod"
    } else {
      return "catalog_second-level"
    }
  }
  modInfo(second) {
    if(second[2] && second[2] === "unmod"){
      return " (На проверке)"
    }
  }  
  render() {

    return(   
      <div className="catalog">

        <h1> Каталог </h1>
          <div className="catalog__header-find-group"> Найти в каталоге:</div>
          <input className="form-control catalog__input-find-group"
                  id="catalog__input-find-group"/>
          <button className="form-control catalog__button-find-group"
                  onClick={this.findClick}>
            Найти
          </button>
          <div/>
          { 
            this.state.catalog.map( global  =>
              <div key={global} className="catalog_global-level">
                <h2 className={this.catalog_finded(global[0])}>{global[0]}</h2>
                { 
                  global.slice(1).map( first  =>
                    <div key={first} className="catalog_first-level">
                      <h4 className={this.catalog_finded(first[0])}>{first[0]}</h4>
                      { 
                        first[1].map( second  =>
                          <div key={second} className={this.modStyle(second)}>
                            <Link
                            className={this.catalog_finded(second[0])}
                            to={"/Article/"+second[1]}>{second[0]}</Link>
                            {this.modInfo(second)}
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )
          }

      </div>
    );
  }
}

export default Catalog;
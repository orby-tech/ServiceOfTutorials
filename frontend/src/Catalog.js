import React, { Component }  from 'react';

import { Link } from 'react-router-dom';





class Catalog extends Component{
  constructor(props) {
    super(props);

    this.state = {
      catalog: []
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
  render() {

    return(   
      <div className="catalog">
      <h1> Каталог </h1>
        { 
          this.state.catalog.map( global  =>
            <div key={global} className="catalog_global-level">
              <h2>{global[0]}</h2>
              { 
                global.slice(1).map( first  =>
                  <div key={first} className="catalog_first-level">
                    <h4>{first[0]}</h4>
                    { 
                      first[1].map( second  =>
                        <div key={second} className="catalog_second-level">
                          <Link
                          to={"/Article/"+second[1]}>{second[0]}</Link>
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
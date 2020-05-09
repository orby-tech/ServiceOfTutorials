import React, { Component }  from 'react';

import { Link } from 'react-router-dom';





class Catalog extends Component{
  constructor(props) {
    super(props);

    this.state = {
      catalog: [["Front-end", ['React', [['First Article', "11111111111"], ['Second Article']]], 
                              ['Redux', [['First Article'], ['Second Article']]]],
                ["Back-end", ['NodeJS', [['First Article'], ['Second Article']]], 
                              ['Django', [['First Article'], ['Second Article']]]]]
    };
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
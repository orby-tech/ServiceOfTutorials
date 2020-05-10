import React, { Component, useState }  from 'react';
import { Route } from 'react-router-dom';

import { Link } from 'react-router-dom';

let second_select = ("")
let creating_block = ("")
let type_new_block = "create-article__type-new-block-no-link"

class CreateArticle extends Component{

  constructor(props) {
    super(props);
    this.first_change = this.first_change.bind(this)
    this.second_change = this.second_change.bind(this)
    this.type_change = this.type_change.bind(this)
    this.state = {
      catalog:  [],
      first_value: "",
      second_value: "",
      constructor: false,
      new_article: [],
      no_link: "create-article__type-new-block-no-link form-control"
    };
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
        this.setState({
          catalog: result
        })
      })
  }


  componentDidUpdate(prevProps, prevState) {
    const { match: { params } } = this.props;
    if (params.pk !== this.state.opend) {
      this.setState({opend: params.pk});
    }
  }

  first_change (event) {
    this.setState({first_value: event.target.value});
    let target 
    for (let i = 0; i<this.state.catalog.length; i++) {
      if(event.target.value === this.state.catalog[i][0]) {
        target = this.state.catalog[i].slice(1)
        break;
      }
    }
    second_select = (
        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={this.second_change}>
          <option value="selected">Тема</option>
          { 
            target.map( first  =>
              <option value={first[0]}>{first[0]}</option>
            )
          }
        </select>
      )
  }
  type_change(event) {
    if (event.target.value === "link") {
      this.setState({no_link: "create-article__type-new-block-link form-control" })
    } else {
      this.setState({no_link: "create-article__type-new-block-no-link form-control" })
    }
  }
  second_change (event) {
    this.setState({second_value: event.target.value});
    if(event.target.value !== "selected"){
      this.setState({constructor: true})
    }
  }
  render() {
    let a = this.state.no_link
    second_select = second_select
    let constructor = this.state.constructor 
                    ? "create-article__container"
                    : "create-article__non-display"
    return(
      <div className="create-article__container">
        <div className="create-article__change col-auto my-1">
          <label  className="mr-sm-2 sr-only" 
                  for="inlineFormCustomSelect" >Preference</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={this.first_change}>
            <option value="selected">Направление</option>
            { 
              this.state.catalog.map( global  =>
                <option value={global[0]}>{global[0]}</option>
              )
            }
          </select>
          {second_select}
          {creating_block}
          <div className={constructor}>
            {
              this.state.new_article.map( global  =>
              <div value={global[0]}>{global[0]}</div>
            )}
                <select className="create-article__choose-type custom-select mr-sm-2" 
                          id="inlineFormCustomSelect" 
                          onChange={this.type_change}>
                    <option value="selected">Тип блока</option>            
                    <option value="header">Заголовок</option>
                    <option value="text">Текст</option>
                    <option value="code">Код</option>
                    <option value="link">Ссылка</option>                                    
                    }
                  </select>
                  <input className="form-control" />
                  <input className={this.state.no_link} />
                  <div className> Добавить блок </div>
          </div>
        </div>

      </div>
    );
  }
}

export default CreateArticle;

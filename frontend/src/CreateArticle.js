import  React, { Component, useState }  from 'react';
import  { Route } from 'react-router-dom';

import  { Link } from 'react-router-dom';
import  editPNG from "./img/edit.png";
import  trashPNG from "./img/trash.png";

const hash = arr => {
    let result = 0;
    let string = arr.toString()
    for (let i = 0; i < string.length; i++) {
        result += string.charCodeAt(i);
    }
    return result % 5;
};

class CreateArticle extends Component{

  constructor(props) {
    super(props);
    this.first_change = this.first_change.bind(this)
    this.second_change = this.second_change.bind(this)
    this.type_change = this.type_change.bind(this)
    this.addBlock = this.addBlock.bind(this)
    this.deleteElement = this.deleteElement.bind(this)
    this.temp_type_change = this.temp_type_change.bind(this)


    this.state = {
      catalog:  [],
      first_value: "",
      second_value: "selected",
      second_steck: [],
      type: "selected",
      temp_type: "selected",
      constructor: false,
      new_article: [],
      redaction: -1,
      no_link: "create-article__type-new-block-no-link form-control create-article__input"
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
  
  first_change (event) {
    this.setState({first_value: event.target.value});
    let target 
    for (let i = 0; i<this.state.catalog.length; i++) {
      if(event.target.value === this.state.catalog[i][0]) {
        target = this.state.catalog[i].slice(1)
        break;
      }
    }
    this.setState({second_steck: target})
  }
  second_change (event) {
    this.setState({second_value: event.target.value});
  }
  type_change(event) {
      this.setState({ type: event.target.value })
  }
  temp_type_change(event) {
      this.setState({ temp_type: event.target.value })
  }
  componentDidUpdate(prevProps, prevState) {
    const { match: { params } } = this.props;
    if (params.pk !== this.state.opend) {
      this.setState({opend: params.pk});
    }
  }


  styleOfArticle(key) {
    if (key[1] === "code") {
      if (!key[3]){
        return  (<div key={key} className="article__code">
                  <div>{key[0]}</div>       
                </div>)        
      }  else {
        return  (
                  <div key={key} className="article__code">
                    <input 
                      onChange={this.changeLabel(key[0])}
                      value={key[0]} />       
                  </div>
                )        
      }
    } else if(key[1] === "text"){
      return (<div key={key} className="article__text">
                {key[0]}     
              </div>)
    } else if(key[1] === "link"){
      return (<div key={key} className="article__link">
                <a href={key[2]}> {key[0]}</a>                      
              </div>)
    } else if(key[1] === "header"){
      return (<div key={key} className="article__header">
                {key[0]}                       
              </div>)
    }
  }



  addBlock() {
    let type = this.state.type
    let textFromForm = document.getElementById("textInputFromForm").value
    let arr = this.state.new_article
    console.log(type)
    if (type !== "selected" && document.getElementById("textInputFromForm").value !== "") {
        if (type === "link") {
          let link = document.getElementById("linkInputFromForm").value
          arr.push([textFromForm, type, link])
          document.getElementById("linkInputFromForm").value = ""
        } else {
          arr.push([textFromForm, type])
        }
        document.getElementById("textInputFromForm").value = ""
        this.setState({new_article: arr})
    } 
    else if (!type || type === "selected"){
      alert ("Укажите тип блока")
    } 
    else if (!textFromForm || textFromForm === "") {
      alert("Заполните пожалуйста все поля")
    }
  }
  redactionBlock(id) {
    console.log(id)
    let type = this.state.temp_type
    let textFromForm = document.getElementById("textInputFromRedaction").value
    let arr = this.state.new_article
    console.log(type)
    if (type !== "selected" && document.getElementById("textInputFromRedaction").value !== "") {
        if (type === "link") {
          let link = document.getElementById("linkInputFromRedaction").value
          arr[id]=[textFromForm, type, link]
          document.getElementById("linkInputFromRedaction").value = ""
        } else {
          arr[id]=[textFromForm, type]
        }
        document.getElementById("textInputFromRedaction").value = ""
        this.setState({new_article: arr})
    } 
    else if (!type || type === "selected"){
      alert ("Укажите тип блока")
    } 
    else if (!textFromForm || textFromForm === "") {
      alert("Заполните пожалуйста все поля")
    }
  }
  deleteElement(id) {
    this.setState(({ new_article }) => {

      const newArray = [
        ...new_article.slice(0, id),
        ...new_article.slice(id + 1)
      ];

      return {
        new_article: newArray
      };
    });
  };
  editElement(id) {
    if (this.state.redaction !== id){
      this.setState({
        redaction: id,
        temp_type: this.state.new_article[id][1]
      })
    } else {
      this.setState({
        redaction: -1,
        temp_type: "selected"
      })
    }
  }
  redactionStyle(id){
    return id === this.state.redaction 
    ? "create-article__redaction-article-block"
    : "create-article__non-display "
  }
  styleOfRedactionInput(moment) {
    if(this.state.temp_type === "link"){
      return "create-article__type-new-block-link form-control create-article__input"
    } else {
      return "create-article__non-display"
    }
  }

  render() {
    let styleOfSecondChange = this.state.second_steck.length !== 0
                      ? "custom-select mr-sm-2 create-article__input" 
                      : "create-article__non-display"
    let styleOfCreatorBlock = this.state.second_value !== "selected"
                      ? ""
                      : "create-article__non-display"
    let styleOfInputBlock = this.state.type !== "selected"
                      ? ""
                      : "create-article__non-display"
    let styleOfInput = this.state.type === "link"
                      ? "create-article__type-new-block-link form-control create-article__input"
                      : "create-article__non-display"    



    return(
      <div className="create-article__container">




        <select  className="custom-select mr-sm-2 create-article__input" 
                 id = "inlineFormCustomSelect create-article__input" 
                 onChange={this.first_change}>
          <option value="selected">Направление</option>

          {this.state.catalog.map( global  =>
              <option value={global[0]}>{global[0]}</option>
          )}
        </select>



        <select  className={styleOfSecondChange}
                 id = "inlineFormCustomSelect create-article__input" 
                 onChange={this.second_change}>
          <option value="selected">Тема</option>

          {this.state.second_steck.map( global  =>
              <option value={global[0]}>{global[0]}</option>
          )}
        </select>


        <div className="article__container">
          { 
            this.state.new_article.map( moment  =>

            <div key={moment}>
              <div className="create-article__block">
                {this.styleOfArticle(moment)}
              </div>
              <div className="create-article__edit-delete">
                <img 
                  className="create-article__delButton"     
                  alt="delete"
                  onClick={() => this.deleteElement(this.state.new_article.indexOf(moment))}
                  src={trashPNG}/>
                <img 
                  className="create-article__editButton"   
                  alt="edit"
                  onClick={() => this.editElement(this.state.new_article.indexOf(moment))}
                  src={editPNG}/>   
            </div>
            {
              <div className={this.redactionStyle(this.state.new_article.indexOf(moment))}>
                <h3> Редактировать </h3>
                <select className="create-article__choose-type custom-select mr-sm-2 create-article__input" 
                        id="inlineFormCustomSelect" 
                        onChange={this.temp_type_change}>
                  <option value="selected">Тип блока</option>            
                  <option value="header">Заголовок</option>
                  <option value="text">Текст</option>
                  <option value="code">Код</option>
                  <option value="link">Ссылка</option>                                  
                </select>
                <input className="form-control create-article__input" id="textInputFromRedaction"/>
                <input className={this.styleOfRedactionInput(moment)} id="linkInputFromRedaction"/>
                <div  className="create-article__create-button"
                      onClick={() => this.redactionBlock(this.state.new_article.indexOf(moment))}> 
                  Изменить блок заполненный блок
                </div>                
              </div> 
            }
            </div>

            )
          }
        </div>



        <div className={styleOfCreatorBlock}>
          <select className="create-article__choose-type custom-select mr-sm-2 create-article__input" 
                  id="inlineFormCustomSelect" 
                  onChange={this.type_change}>
            <option value="selected">Тип блока</option>            
            <option value="header">Заголовок</option>
            <option value="text">Текст</option>
            <option value="code">Код</option>
            <option value="link">Ссылка</option>                                  
          </select>
        </div>


        <div className={styleOfInputBlock}>
          <input className="form-control create-article__input" id="textInputFromForm"/>
          <input className={styleOfInput} id="linkInputFromForm"/>
          <div  className="create-article__create-button"
                onClick={this.addBlock}> 
            Добавить блок заполненный блок
          </div>
          <div  className="create-article__uppend-button"
                onClick={this.publicateArticle}> 
            Опубликовать статью 
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticle;

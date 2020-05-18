import React, { Component }  from 'react';

import { Route } from 'react-router-dom';
import  Service  from  './Service';
import  Comments from './Comments';

import  editPNG from "./img/edit.png";
import  trashPNG from "./img/trash.png";
import  append from "./img/plus.png"

const  service  =  new  Service();

class ArticleRedactor extends Component{

  constructor(props) {
    super(props);
    this.deleteElement = this.deleteElement.bind(this)
    this.appendElement = this.appendElement.bind(this)
    this.temp_type_change = this.temp_type_change.bind(this)
    this.publicateArticle = this.publicateArticle.bind(this)
    const { match: { params } } = this.props;
    this.state = {
      article:  [],
      id: params.pk,
      status: null,
      edit: null,
      temp_type: null
    };
  }


  componentDidMount(){
    var  self  =  this;

    service.getArticle({id: this.state.id}).then(function (result) {
      self.setState({ article: result })
    });
  }

  styleOfArticle(key) {
    if(!key){

    } else if (key[1] === "code") {
      return  (<div key={key} className="article__code">
                {key[0]}
              </div>)
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
  deleteElement(id) {
    this.setState(({ article }) => {

      const newArray = [
        ...article.slice(0, id),
        ...article.slice(id + 1)
      ];

      return {
        article: newArray
      };
    });
  };
  editElement(id) {
    this.setState({
      edit: this.state.article[id],
      status: "edit",
      temp_type: this.state.article[id][1]
    })
  }
  appendElement(id) {
    if(id !== -2 ){
      this.setState({
        edit: this.state.article[id],
        status: "append",
        temp_type: null
      })
    } else {
      this.setState({
        edit: [],
        status: "append",
        temp_type: null
      })
    }

  }
  addBlock(id) {
    console.log(id)
    let type = this.state.temp_type
    let textFromForm = document.getElementById("textInputFromRedaction").value
    let arr = this.state.article
    console.log(arr)
    let temp_arr = []
    console.log(type)
    if (type !== "selected" && document.getElementById("textInputFromRedaction").value !== "") {
        if (type === "link") {
          let link = document.getElementById("linkInputFromRedaction").value
          temp_arr = [textFromForm, type, link]
          document.getElementById("linkInputFromRedaction").value = ""
        } else {
          temp_arr = [textFromForm, type]
        }
        if(-1 !== id){
          arr = [
            ...arr.slice(0, id),
            ...[temp_arr],
            ...arr.slice(id )
          ];
        } else {
          arr.push(temp_arr)
        }

        document.getElementById("textInputFromRedaction").value = ""
        this.setState({
          article: arr,
          status: null
        })
        console.log(arr)
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
    let arr = this.state.article
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
        this.setState({
          article: arr,
          status: null
        })
    } 
    else if (!type || type === "selected"){
      alert ("Укажите тип блока")
    } 
    else if (!textFromForm || textFromForm === "") {
      alert("Заполните пожалуйста все поля")
    }
  }
  styleOfRedactionInput(moment) {
    if(this.state.temp_type === "link"){
      return "create-article__type-new-block-link form-control create-article__input"
    } else {
      return "create-article__non-display"
    }
  }
  temp_type_change(event) {
    this.setState({ temp_type: event.target.value })
  }


  publicateArticle(){

    if (this.state.article[0][1] !== "header") {
      alert("Статья должна начинаться с Заголовока")
    } else{
      this.setState({loading: true})
      var  self  =  this;

      var raw = {
        "id": this.state.id,
        "article": this.state.article
      }
      service.redactorArticle(raw).then(function (result) {
        self.setState({loading:false})
        alert("Статья отредактирована, и на ходится на модерации, спасибо, удачного дня!)")
        window.location.reload();
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params } } = this.props;
    if (params.pk !== this.state.opend) {
      this.setState({opend: params.pk});
    }
  }

  render() {
    if(this.state.status === "edit"){
      let moment = this.state.edit
      return (
        <div className="article__container">

        {this.styleOfArticle(moment)}
        <br/>
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
                onClick={() => this.redactionBlock(this.state.article.indexOf(moment))}> 
            Изменить заполненный блок
          </div>                
        </div> 
      )
    } else if(this.state.status === "append"){
      let moment = this.state.edit
      return (
        <div className="article__container">

        {this.styleOfArticle(moment)}
        <br/>
          <h3> Добавить </h3>
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
                onClick={() => this.addBlock(this.state.article.indexOf(moment))}> 
            Изменить заполненный блок
          </div>                
        </div> 
      )
    } else  return(
      <div className="article__container">
        { 
          this.state.article.map( moment  =>
            <div>
              <img 
                className="article__appendButton"	      		
                onClick={() => this.appendElement(this.state.article.indexOf(moment))}
                alt="plus"
                src={append}/>
              {this.styleOfArticle(moment)}
              <img 
                className="article__delButton"     
                alt="delete"
                onClick={() => this.deleteElement(this.state.article.indexOf(moment))}
                src={trashPNG}/>
              <img 
                className="article__editButton"   
                alt="edit"
                onClick={() => this.editElement(this.state.article.indexOf(moment))}
                src={editPNG}/>   
            </div>
          )
        }
              <img 
                className="article__appendButton"	      		
                onClick={() => this.appendElement(-2)}
                alt="plus"
                src={append}/>
          <div  className="create-article__uppend-button"
                onClick={this.publicateArticle}> 
            Опубликовать статью 
          </div>
      </div>
    );
  }
}

export default ArticleRedactor;

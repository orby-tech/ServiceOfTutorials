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

    const { match: { params } } = this.props;
    this.state = {
      article:  [],
      id: params.pk
    };
  }


  componentDidMount(){
    var  self  =  this;

    service.getArticle({id: this.state.id}).then(function (result) {
      self.setState({ article: result })
    });
  }

  styleOfArticle(key) {
    if (key[1] === "code") {
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
    if (this.state.redaction !== id){
      this.setState({
        redaction: id,
        temp_type: this.state.article[id][1]
      })
    } else {
      this.setState({
        redaction: -1,
        temp_type: "selected"
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params } } = this.props;
    if (params.pk !== this.state.opend) {
      this.setState({opend: params.pk});
    }
  }

  render() {

    return(
      <div className="article__container">
        { 
          this.state.article.map( moment  =>
            <div>
              <img 
                className="article__appendButton"	      		
                onClick={() => this.handleAppend(moment)}
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
      </div>
    );
  }
}

export default ArticleRedactor;

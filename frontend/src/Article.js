import React, { Component, useState }  from 'react';
import { Route } from 'react-router-dom';

import { Link } from 'react-router-dom';



class Article extends Component{

  constructor(props) {
    super(props);

    this.state = {
      article:  []
    };
  }
  componentDidMount(){
    const { match: { params } } = this.props;

    var myHeaders = new Headers();
    var raw = JSON.stringify({"id": params.pk});
    console.log(params.pk)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch('http://127.0.0.1:8000/article', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result[0].article)
        this.setState({    
              article: result[0].article
            })
      })
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
            this.styleOfArticle(moment)
          )
        }
      </div>
    );
  }
}

export default Article;

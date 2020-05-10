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
    this.setState({opend: params.pk});
    var myHeaders = new Headers();
    var raw = JSON.stringify({"id":"11111111111"});
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
    if (key === "code") {
      return "article__code"
    } else if(key === "text"){
      return "article__text"
    } else if(key === "link"){
      return "article__link"
    } else if(key === "header"){
      return "article__header"
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
            <div key={moment} className={this.styleOfArticle(moment[1])}>
              {moment[0]}
            </div>
          )
        }
      </div>
    );
  }
}

export default Article;

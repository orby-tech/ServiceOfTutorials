import React, { Component }  from 'react';

import  Service  from  './Service';



const  service  =  new  Service();

class Article extends Component{

  constructor(props) {
    super(props);

    this.state = {
      article:  []
    };
  }


  componentDidMount(){
    const { match: { params } } = this.props;
    var  self  =  this;

    service.getArticle({id: params.pk}).then(function (result) {
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

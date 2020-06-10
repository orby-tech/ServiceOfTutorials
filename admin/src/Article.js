import React, { Component }  from 'react';

import  Service  from  './Service';
import  Comments from './Comments';
import { Link } from 'react-router-dom';
import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'


const  service  =  new  Service();

class PREArticle extends Component{

  constructor(props) {
    super(props);

    const { match: { params } } = this.props;

    let article = []
    const { currentLanguageCode } = this.props;
    let fref = 'Article'+ params.pk + currentLanguageCode

    if(localStorage.getItem(fref)){
      article = JSON.parse(localStorage.getItem(fref))
    }
    this.state = {
      article:  article,
      id: params.pk
    };
  }


  componentDidMount(){
    var  self  =  this;
    const { currentLanguageCode } = this.props;
    let fref = 'Article'+this.state.id + currentLanguageCode

    service.getArticle({id: this.state.id, leng: currentLanguageCode }).then(function (result) {    
        
      if (result && result[0]) {
        localStorage.setItem(fref, JSON.stringify(result[0].article))
        self.setState({ article: result[0].article })
      }  
    });
  }
  componentWillUpdate(prevProps) {
    var  self  =  this;
    if(prevProps.currentLanguageCode !== this.props.currentLanguageCode){
      let fref = 'Article'+ this.state.id + prevProps.currentLanguageCode
      if(localStorage.getItem(fref)){
        let article = JSON.parse(localStorage.getItem(fref))
        self.setState({ article: article })
      }
      service.getArticle({id: self.state.id, leng:  prevProps.currentLanguageCode }).then(function (result) {  
        if ( result && result[0] ) {
          localStorage.setItem(fref, JSON.stringify(result[0].article))
          self.setState({ article: result[0].article })
        }  
      });
    }
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
    const { strings, currentLanguageCode } = this.props;
    return(
        <div className="article__container">
          { 
            this.state.article.map( moment  =>
              this.styleOfArticle(moment)
            )
          }

          <Link className="article__readact btn btn-success" to={"/ArticleRedactor/"+this.state.opend}>
            {strings["articleEdit"]}
          </Link>
          <Comments id={this.state.id}/>
      </div>
    );
  }
}
const Article = connect()(multilanguage(PREArticle));

export default Article;

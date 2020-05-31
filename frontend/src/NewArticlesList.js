import React, { Component }  from 'react';

import { Link } from 'react-router-dom';
import  Service  from  './Service';
import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'

import { FindForm } from './FindCatalog.tsx';

const  service  =  new  Service();


function sortfunction(a, b){
  return (a[0][3] - b[0][3])
  }
const newArticlesSorting = (catalog) => {
  let arr = []
  catalog.map( global=>
      global.splice(1).map( first => 
          first[1].forEach( second  => {
              if(second[1] && second[2] !== "noDisplay"){
                      arr.push([[global[0], first[0]].concat(second)])
              }
          })   
      )
  )
  arr.sort(sortfunction)
  arr.reverse()
  return arr
}

class PRENewArticles extends Component{
  constructor(props) {
    super(props);
    this.findClick = this.findClick.bind(this)

    const { currentLanguageCode } = this.props;
    let newArticles = []
    if(localStorage.getItem('newArticles' + currentLanguageCode )){
      newArticles = JSON.parse(localStorage.getItem('newArticles' + currentLanguageCode ))
    }
    this.state = {
      catalog: [],
      find: null,
      loading: false,
      NewArticles: newArticles,
    }
  }


  componentDidMount(){
    var  self  =  this;
    const { currentLanguageCode } = this.props;
    service.getCatalog({ leng: currentLanguageCode }).then(function (result) {
      if (result) {
        self.setState({ catalog: result, loading: true })

        let arr = newArticlesSorting(self.state.catalog)
        self.setState({NewArticles: arr, loading: false})
        localStorage.setItem('newArticles' + currentLanguageCode, JSON.stringify(arr))
      }

    });
  }
  componentWillUpdate(prevProps) {
    var  self  =  this;
    const { currentLanguageCode } = this.props;
    console.log(prevProps.currentLanguageCode , currentLanguageCode)
    if(prevProps.currentLanguageCode !== currentLanguageCode){
      let locName = 'newArticles' + currentLanguageCode

      if(localStorage.getItem(locName)){
        self.setState({ catalog: JSON.parse(localStorage.getItem(locName))})
      }

      service.getCatalog({leng: prevProps.currentLanguageCode}).then(function (result) {
        if (result) {
          self.setState({ catalog: result, loading: true })
  
          let arr = newArticlesSorting(self.state.catalog)
          self.setState({NewArticles: arr, loading: false})
          localStorage.setItem('newArticles' + currentLanguageCode, JSON.stringify(arr))
        }
      });
    }
  }

  catalog_finded(temp) {
    temp= temp.toLowerCase()
    let str = this.state.find ? this.state.find.toLowerCase() : null
    return temp.indexOf(str) !== -1 ? "catalog__finded-style" : ""
  }


  findClick(){
    this.setState({find: document.getElementById("catalog__input-find-group").value})
  }


  modStyle(second) {
    if (second[2] && second[2] === "unmod") {
      return "catalog__second-level-unmod"
    } else if (second[2] && second[2] === "noDisplay") {
      return "catalog__second-level-delete"
    } else {
      return "catalog_second-level"
    }
  }


  modInfo(second) {
    if(second[2] && second[2] === "unmod"){
      return " (На проверке)"
    } else if(second[2] && second[2] === "noDisplay"){}
  }  

  
  render() {
    const { strings, currentLanguageCode } = this.props;
    console.log(currentLanguageCode)
    if (this.state.loading) {
      return (
        <>
        <div className="cssload-container">
            <div className="cssload-zenith"></div>
        </div>
        </>
      )
    
    } else return(   
      <div className="catalog">

        <h1> {strings["newArticles"]} </h1>
        <FindForm onAdd={this.FindFormHandler} strings={strings["find"]}/>
          <div/>
          { 
            this.state.NewArticles.map( global  =>
                <div className="newArticlesList__article" key={global}> 
                    <Link className="newArticlesList__link" to={"/Article/"+global[0][3]}>{global[0][2]}</Link> 
                    <p className="newArticlesList__context">{global[0][1]} ({global[0][0]})</p>

                    <h6 className="newArticlesList__context"> рейтинг:  { global[0][5]}</h6>
                </div>
            )
          }

      </div>
    );
  }
}
const NewArticles = connect()(multilanguage(PRENewArticles));
export default NewArticles;
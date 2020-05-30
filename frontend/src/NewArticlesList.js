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

class PRENewArticles extends Component{
  constructor(props) {
    super(props);
    this.findClick = this.findClick.bind(this)

    
    let newArticles = []
    if(localStorage.getItem('newArticles')){
      newArticles = JSON.parse(localStorage.getItem('newArticles'))
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
    service.getCatalog().then(function (result) {
      self.setState({ catalog: result, loading: true })
        let arr = []
        self.state.catalog.map( global=>
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
        console.log(arr)
        self.setState({NewArticles: arr, loading: false})
    });
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
                    <p className="newArticlesList__context">{global[0][1]} ({global[0][0]}) рейтинг:  { global[0][5]}</p>
                </div>
            )
          }

      </div>
    );
  }
}
const NewArticles = connect()(multilanguage(PRENewArticles));
export default NewArticles;
import  React, { Component, useState }  from 'react';
import  { Route } from 'react-router-dom';

import  { Link } from 'react-router-dom';
import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class Admin extends Component{

  constructor(props) {
    super(props);
    this.goodStateUpdate = this.goodStateUpdate.bind(this)
    this.badStateUpdate = this.badStateUpdate.bind(this)
    this.state = {
      catalog: [],
      type: "newArticles",
      newArticles: [],
      selectedArticle: 0,
      article: [],
      reload: false,
      loading: true
    };
  }
  componentDidMount(){
    var  self  =  this;
    service.getCatalog().then(function (result) {
      let arr = []
      for (let i=0; i<result.length; i++){
        for (let j=1; j<result[i].length; j++){  
          for (let z=1; z<result[i][j].length; z++){
            for (let k=1; k<result[i][j][z].length; k++){
              if (result[i][j][z][k][2] && result[i][j][z][k][2] === "unmod"){
                arr.push([result[i][j][z][k], result[i][0], result[i][j][0]])
                console.log(result[i][j][z][k], result[i][0], result[i][j][0])
              }
            }
          }
        }
      }
     if (arr.length!==0) {
        service.getArticle({id: arr[0][0][1].toString()}).then(function (result_article) {
          self.setState({    
            article: result_article,
            catalog: result,
            newArticles: arr,
            selectedArticle: arr.length > 0 ? 0 : -1,
            loading:false
          })
        });
        
        } else {
          self.setState({loading:false})
        }   
    });
  }



  type_change(event) {
    this.setState({type: event.target.value})
  }
  

  goodStateUpdate(){
    if(this.state.newArticles){
      this.setState({loading: true})

      var myHeaders = new Headers();
      var raw = JSON.stringify({"id": this.state.newArticles[this.state.selectedArticle]});
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch('http://127.0.0.1:8000/goodArticleUpdate', requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.toString() === "finded") window.location.reload();
          this.setState({loading: false})

        })

        .catch((err) => { console.log(err, "err")})
    }  
  }
  badStateUpdate(){
    if(this.state.newArticles){
      this.setState({loading: true})
      var myHeaders = new Headers();
      var raw = JSON.stringify({"id": this.state.newArticles[this.state.selectedArticle]});
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch('http://127.0.0.1:8000/badArticleUpdate', requestOptions)
        .then(response => response.json())
        .then(result_article => {
          if(result_article.toString() === "finded") window.location.reload();
          this.setState({loading: false})


        })
    }
  }


  render() {
    let newArticlesState = this.state.type === "newArticles"
    ? ""
    : "admin__nonDisplay"
    if (this.state.loading) {
      return (
        <>
        <div className="cssload-container">
            <div className="cssload-zenith"></div>
        </div>
        </>
      )
    
    } else if(this.state.newArticles.length===0){
      return("Нет новых статей")

    } else return(
      <div className="admin__container">

        <select  className="custom-select mr-sm-2" 
                 id = "inlineFormCustomSelect" 
                 onChange={this.type_change}>
          <option value="newArticles"> Новые статьи </option>
        </select>




        <div className={newArticlesState}>
          <div className="admin__newArticlesSelectorBlock">      
            <img 
              className="admin__selector"     
              alt="delete"

              onClick={this.badStateUpdate}
              src={deletePNG}/>            
            <img 
              className="admin__selector"     
              alt="upgrade"
              onClick={this.goodStateUpdate}
              src={upgradePNG}/>
          </div>

          <div className="admin__grade"> </div>

          <div className="admin__selectedArticle">
            <table>
                      { 
                        this.state.article.map( second  =>
                          <tr> 
                            <td> {second[0]} </td>
                            <td> {second[1]} </td>
                          </tr>
                          
                        )
                      }
            </table>
          </div>

        </div>






      </div>
    );
  }
}

export default Admin;

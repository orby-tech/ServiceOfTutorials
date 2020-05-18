import  React, { Component }  from 'react';


import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class adminRedactions extends Component{

  constructor(props) {
    super(props);
    this.goodStateAppdate = this.goodStateAppdate.bind(this)
    this.badStateAppdate = this.badStateAppdate.bind(this)
    this.state = {
      id: null,
      article: [],
      newArticle: [],
      reload: false,
      loading: true
    };
  }
  componentDidMount(){
    var  self  =  this;
    service.getRedactions().then(function (result) {
      console.log(result)
      self.setState({
        article: result.article,
        newArticle: result.newArticle,
        id: result.id,
        loading:false
      })
      })
     
  }

  goodStateAppdate(){
    if(this.state.newArticle){
      
      this.setState({loading: true})
      var raw = {
        "id": this.state.id,
        "article": this.state.newArticle
      };
      var  self  =  this;
      service.RedactionAppdate(raw).then(function (result) {
        if(result.toString() === "finded") window.location.reload();
        self.setState({loading: false})
      })
    }
  }
  badStateAppdate(){
    if(this.state.newArticle){
      
      this.setState({loading: true})
      var raw = {
        "id": this.state.id,
        "article": this.state.article
      };
      var  self  =  this;
      service.RedactionAppdate(raw).then(function (result) {
        if(result.toString() === "finded") window.location.reload();
        self.setState({loading: false})
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
    
    } else if(this.state.newArticle.length===0){
      return("Нет новых статей")

    } else return(
      <div className="">

        <div className="">
          <div className="admin__newArticlesSelectorBlock">      
            <img 
              className="admin__selector"     
              alt="delete"

              onClick={this.badStateAppdate}
              src={deletePNG}/>            
            <img 
              className="admin__selector"     
              alt="upgrade"
              onClick={this.goodStateAppdate}
              src={upgradePNG}/>
          </div>

          <div className="admin__grade"> </div>

          <div className="adminRedactions__selectedArticle">
            <table>
              { 
                this.state.article.map( second  =>
                  <>
                    <tr> 
                      <td> {second[0]} </td>
                      <td> {second[1]} </td>
                    </tr>
                    <tr></tr>
                  </>
                )
              }
            </table>
            <table>
              { 
                this.state.newArticle.map( second  =>
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

export default adminRedactions;

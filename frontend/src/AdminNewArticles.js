import  React, { Component }  from 'react';


import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class AdminNewArticles extends Component{

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
      var raw = {"id": this.state.newArticles[this.state.selectedArticle]};
      var  self  =  this;
      service.goodArticleUpdate(raw).then(function (result) {
        if(result.toString() === "finded") window.location.reload();
        self.setState({loading: false})
      })
    }
  }
  badStateUpdate(){
    if(this.state.newArticles){
      
      this.setState({loading: true})
      var raw = {"id": this.state.newArticles[this.state.selectedArticle]};
      var  self  =  this;
      service.badArticleUpdate(raw).then(function (result) {
        window.location.reload()
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
    
    } else if(this.state.newArticles.length===0){
      return("Нет новых статей")

    } else return(
      <div className="admin__container">




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

export default AdminNewArticles;

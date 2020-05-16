import  React, { Component }  from 'react';


import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class AdminStructure extends Component{

  constructor(props) {
    super(props);
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
          console.log()
        }
      }

    });
  }



  render() {
    return(
      <div className="admin__container">

      </div>
    );
  }
}

export default AdminStructure;

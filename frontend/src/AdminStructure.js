import  React, { Component }  from 'react';


import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class AdminStructure extends Component{

  constructor(props) {
    super(props);
    this.state = {
      catalogStructure: []
    };
  }
  componentDidMount(){
    var  self  =  this;
    let temp_arr = []
    let arr = []
    service.getCatalog().then(function (result) {
      let arr = []
      result.map(global => {
        temp_arr = []
        global.splice(1).map ( first => temp_arr.push(first[0]) )
        arr.push([global[0], temp_arr])
      })

      self.setState({catalogStructure: arr})
    });
  }



  render() {
    return(
      <div className="structure__block">
        <button className="btn btn-success"> 
          Добавить тему
        </button>	
        <br />
        {
          this.state.catalogStructure.map(global =>
            <div className="structure__type">
              <h3> {global[0]}</h3>
              <div className="structure__container">
                <div className="structure__typeButton">
                  <button className="btn btn-success"> 
                    Добавить 
                  </button>	                
                </div>
                <div className="structure__underType">
                  {
                    global[1].map( first =>
                        <p>{first}</p>
                      )
                  }
                </div>
              </div>
            </div>            
            )
        }
      </div>
    );
  }
}

export default AdminStructure;

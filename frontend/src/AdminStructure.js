import  React, { Component }  from 'react';


import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class AdminStructure extends Component{

  constructor(props) {
    super(props);
    this.state = {
      catalogStructure: [],
      showNewType: false,
      uppend: null
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
  typeUppend(){
    this.setState({
      showNewType: true,
      uppend: "type"
    })
  }
  underTypeUppend(){
    this.setState({
      showNewType: true,
      uppend: "undertype"
    })
  }


  render() {
    return(
      <div className="structure__block">
        <button className="btn btn-success" onClick={() => this.typeUppend}> 
          Добавить тему
        </button>	
        <br />
        {
          this.state.catalogStructure.map(global =>
            <div className="structure__type">
              <h3> {global[0]}</h3>
              <div className="structure__container">
                <div className="structure__typeButton">
                  <button className="btn btn-success" onClick={() => this.underTypeUppend(global[0])}> 
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

        <Modal show={this.state.showNewType} onHide={this.closeModal}>
          <div className="newComment__container">
            <h3>Комментарий</h3>

            <form>
              <input className="form-control" id="newCommentName" placeholder="Новый раздел"/>
              <button className="newComment__uppend btn btn-success" onClick={() => this.newTypeUppend()}> Добавить </button>	 
            </form>

          </div>

        </Modal>
      </div>
    );
  }
}

export default AdminStructure;

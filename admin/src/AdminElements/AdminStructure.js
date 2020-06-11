import  React, { Component }  from 'react';


import Modal from 'react-bootstrap/Modal';
import  Service  from  './../Service';



const  service  =  new  Service();


class AdminStructure extends Component{

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this)
    this.typeUppend = this.typeUppend.bind(this)
    this.underTypeUppend = this.underTypeUppend.bind(this)

    this.state = {
      catalogStructure: [],
      showNewType: false,
      type: null,
      loading: false
    };
  }
  componentDidMount(){
    var  self  =  this;
    let temp_arr = []
    service.getCatalog({leng: "ru"}).then(function (result) {
      let arr = []
      result.forEach(global => {
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
      type: -1
    })
  }
  underTypeUppend(type){
    this.setState({
      showNewType: true,
      type: type
    })
  }
  newTypeUppend(){
    this.setState({loading:true})
    var  self  =  this;
    let raw = {
      type:this.state.type,
      newValue: document.getElementById("newTypeName").value

    }
    console.log(raw)
    service.newType(raw).then(function (result) {
      window.location.reload()
      self.setState({
        loading: false,
        type: null
      })
    });
  }

  closeModal(){
    this.setState({showNewType: false})
  }
  render() {
    return(
      <div className="structure__block">
        <button className="btn btn-success" onClick={() => this.typeUppend()}> 
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
            <h3>Добавить раздел</h3>

              <input className="form-control" id="newTypeName" placeholder="Новый раздел"/>
              <button className="newComment__uppend btn btn-success" onClick={() => this.newTypeUppend()}> Добавить </button>	 


          </div>

        </Modal>
      </div>
    );
  }
}

export default AdminStructure;

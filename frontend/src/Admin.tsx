import  React, { Component }  from 'react';

import  AdminNewArticles  from './AdminNewArticles'
import  AdminStructure  from './AdminStructure'
import  AdminRedactions  from './AdminRedactions'




class Admin extends Component{

  constructor(props) {
     
    super(props);
    let select : string = "newState";
    this.state = {
      select : select
    };

    this.selector = this.selector.bind(this)


  
  }
  selector(event){
    this.setState({select: event.target.value})
  }


  render() {
    let adminElement
    if(this.state.select === "newState"){
      adminElement = <AdminNewArticles />
    } else if(this.state.select === "structure"){
      adminElement = <AdminStructure />
    } else if(this.state.select === "redactions"){
      adminElement = <AdminRedactions />
    }

    return(
      
      <>
      <div className="admin__container">
        <select  className="custom-select leader__selectPersone" onChange={this.selector}>
          <option value="newState"> Новые статьи </option>
          <option value="structure"> Редактировать структуру </option>
          <option value="redactions"> Предложенные редакции </option>
        </select>
        <br/>
      </div>
        
        {adminElement}
      </>
    )

  }
}

export default Admin;

import  React, { Component }  from 'react';

import  AdminNewArticles  from './AdminNewArticles'
import  AdminStructure  from './AdminStructure'


class Admin extends Component{

  constructor(props) {
    super(props);
    this.selector = this.selector.bind(this)
    this.state = {
      select: "newState"
    };
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
    }

    return(
      
      <div className="admin__container">
        <select  className="custom-select leader__selectPersone" onChange={this.selector}>
          <option value="newState"> Новые статьи </option>
          <option value="structure"> Редактировать структуру </option>
          <option value="redactions"> Предложенные редакции </option>
        </select>
        <br/>
        {adminElement}
      </div>
    )

  }
}

export default Admin;

import  React, { Component } from 'react';

import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'


class PREDownload extends Component{
    constructor(props) {
      super(props);

      this.state = {

      }
    }
    componentDidMount(){

    }
  
  
    render() {
      return(   
        <>
       
        </>
      );
    }
  }
  const Download = connect()(multilanguage(PREDownload));
  export default Download;
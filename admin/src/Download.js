import  React, { Component } from 'react';

import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'

import  android from "./img/android.png"
import androidAPK from "./downloads/android.apk"
class PREDownload extends Component{
    constructor(props) {
      super(props);

      this.state = {

      }
    }
    componentDidMount(){

    }
    androidDownload(){
    }
  
    render() {
        const { strings, currentLanguageCode } = this.props;
        return(   
            <>
                <a href={androidAPK} download className="download__element" onClick={this.androidDownload}>
                    <img className="download__androidIMG" src={android}/>  
                    <h2> {strings["download__android"]} </h2>
                </a>
            </>
        );
    }
  }
  const DownloadComponent = connect()(multilanguage(PREDownload));
  export default DownloadComponent;
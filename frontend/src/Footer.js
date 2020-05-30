import React, { Component }  from 'react';
import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'

class PREFooter extends Component{


  render() {
    const { strings, currentLanguageCode } = this.props;
    return(   
      <div className="footer">
      <p className="footer__about"> {strings["footerCreate"]}</p>
      <a className="footer__link" href="http://www.orby.site/about"> {strings["footerAuthor"]} </a>

      </div>
    );
  }
}
const Footer = connect()(multilanguage(PREFooter));
export default Footer;
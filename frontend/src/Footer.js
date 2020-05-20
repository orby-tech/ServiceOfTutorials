import React, { Component }  from 'react';

import { Link } from 'react-router-dom';





class Footer extends Component{


  render() {

    return(   
      <div className="footer">
      <p className="footer__about"> Создал и поддерживает проект:</p>
      <a className="footer__link" href="http://www.orby.site/about">  Бондаренко Тимур </a>

      </div>
    );
  }
}

export default Footer;
import React, { Component }  from 'react';

import { Link } from 'react-router-dom';





class Footer extends Component{


  render() {

    return(   
      <div className="footer">
      <p className="footer__about"> Создал и поддерживает проект:</p>
      <p className="footer__author"> Бондаренко Тимур </p>

      <a className="footer__link" href="http://www.orby.site/about"> Контакты </a>

      <a className="footer__link" href="http://www.orby.site/about"> Другие проекты </a>

      </div>
    );
  }
}

export default Footer;
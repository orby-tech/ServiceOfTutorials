import React, { Component }  from 'react';

import { Link } from 'react-router-dom';





class Footer extends Component{


  render() {

    return(   
      <div className="footer">
      <p className="footer__about"> Создал и поддерживает проект:</p>
      <p className="footer__author"> Бондаренко Тимур </p>

      <Link className="footer__link"> Контакты </Link>

      <Link className="footer__link"> Другие проекты </Link>

      </div>
    );
  }
}

export default Footer;
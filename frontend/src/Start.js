import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


class Start extends Component{
	render(){
		return(
			<div className="start__global">
				<h2> О проекте </h2>
				<p> 
						Не относитесь к этому ресурсу как к источнику капитальных знаний.
				<br/> 
				<br/>
						Статьи опубликованные здесь предназначенны исключительно для изи-старта.
				<br/> 
				<br/>
				</p>
				<h4> 
						Вы не станете профессионалом по этим статьям!
				</h4>
				<p>
						Но вы сделаете первый шаг, а это уже пол дела. 
				</p>
				<br/>
				<br/>
				<h4>
						Этот ресурс - не учебник!
				</h4>
				<p>				
						Безусловно, мы стараемся делать его максимально правильным и подробным.
				<br/>
						Но у данного подхода, естественно, есть явные минусы, мы в курсе них.
				<br/>
				<br/>
						И хотим, чтобы вы знали их тоже:
				<br/>
				<br/>
				<ol className="start__ol">
					<li> Недостаточность информации </li>
					<li> Необходимость дополнения </li>
					<li> Не развернутость</li>
					<li> Мы будем рады дополнению и расширению данной базы </li>
					<li> Мы будем рады узнать об ошибках </li>
				</ol> 
				</p>
				<h1>
						Начни прямо сейчас!
				</h1>

        <Link
              className="nav-link"
              to="/catalog"> Каталог мини статетей
        </Link>				
        <Link
              className="nav-link "
              to="/toparticles"> Лучшие статьи
        </Link>
        <Link
              className="nav-link"
              to="/newarticles"> Новые статьи
        </Link>
			</div>
			)
	}
}
export default Start;
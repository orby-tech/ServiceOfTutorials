import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import  { connect } from 'react-redux'

class PREStart extends Component{
	state = {language: 'en'}

	changeLanguage = e => {
		const languageCode = e.target.value;
		this.props.dispatch(changeLanguage(languageCode));
	  };
	  componentDidMount(){
		this.loadLanguages();
	  }
	  loadLanguages() {
		this.props.dispatch(loadLanguages({
			languages: {
			  en: require("./languages/en.json"),
			  ru: require("./languages/ru.json")
			}
		  })
		);
	  }
	render(){
		const { strings, currentLanguageCode } = this.props;
		return(
			<div className="start__global">
				<h2>{strings["aboutTitle"]}</h2>
				<p> 
					{strings["about0Text"]}				
					<br/>
					{strings["about1Text"]}						
				</p>
				<br/>
				<hr/>
				<h4> 
					{strings["about0Header"]}
				</h4>
				<p>
					{strings["about10Text"]}
				</p>
				<br/>
				<hr/>
				<h4>
					{strings["about1Header"]}	
				</h4>
				<p>	
					{strings["about12Text"]}			
					<br/>
					{strings["about13Text"]}			
					<br/>
					<br/>
					{strings["about2Header"]}			
					<br/>
				<br/>
				<ol className="start__ol">
					<li> {strings["about0list"]} </li>
					<li> {strings["about1list"]} </li>
					<li> {strings["about2list"]}</li>
					<li> {strings["about3list"]} </li>
					<li> {strings["about4list"]} </li>
				</ol> 
				</p>
				<h1>
					{strings["about3Header"]}
				</h1>

        <Link
              className="nav-link"
              to="/catalog"> {strings["about0link"]}
        </Link>				
        <Link
              className="nav-link "
              to="/toparticles"> {strings["about1link"]}
        </Link>
        <Link
              className="nav-link"
              to="/newarticles"> {strings["about2link"]}
        </Link>
			</div>
			)
	}
}
const Start = connect()(multilanguage(PREStart));
export default Start;
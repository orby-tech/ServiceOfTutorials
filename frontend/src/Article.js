import React, { Component, useState }  from 'react';
import { Route } from 'react-router-dom';

import { Link } from 'react-router-dom';



class Article extends Component{

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      opend: "",
      auth: false, 
    };
  }
  componentDidMount(){
    const { match: { params } } = this.props;
    this.setState({opend: params.pk});
    console.log(this.state.opend.toString())
  }


  componentDidUpdate(prevProps) {
    const { match: { params } } = this.props;
    if (params.pk !== this.state.opend) {
      this.setState({opend: params.pk});
    }
  }

  render() {
    const opend = this.state.opend;

    return(
      <>
      {opend}
      </>
    );
  }
}

export default Article;

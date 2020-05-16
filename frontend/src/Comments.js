import  React, { Component, useState }  from 'react';

import { Route } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import  Service  from  './Service';

const  service  =  new  Service();


class Comments extends Component{

  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this)
    this.state = {
      id: this.props.id,
      comments: [],
      showNewComment: false 
    };
  }
  componentDidMount(){
    var  self  =  this;
    console.log(this.state.id)
    service.getComments({id: this.state.id}).then(function (result) {
      self.setState({ comments: result })
      console.log(result)
    });
  }
  handleShow(){
    this.setState({showNewComment: true})
  }


  render() {
    return(
      <div className="comments__container">
        <h2 className="comments__title">  Комментарии: </h2>
        {
          this.state.comments.map(comment =>
            <div className="comments__block">
              <h2 className="comments__header">{comment.header} </h2>
              <p className="comments__date">{comment.date}</p>
              <br/>
              <div className="comments__text"> {comment.text} </div>
              <div className="comments__author"> автор: {comment.author} </div>
            </div>
            )
        }
        <div className="comments__uppend" onClick={this.handleShow}>
          Написать комментарий
        </div>

        <Modal show={this.state.showNewComment}>
        </Modal>
      </div>
    );
  }
}

export default Comments;

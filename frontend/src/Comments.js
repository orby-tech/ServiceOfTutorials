import  React, { Component, useState }  from 'react';

import { Route } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import  Service  from  './Service';

const  service  =  new  Service();


class Comments extends Component{

  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
  closeModal(){
    this.setState({showNewComment: false})
  }
  delelteComment(comment){
    service.deleteComment({ comment: comment, article: this.state.id }).then(function (result) {
    });
  }
  newCommentAppend(){
    if(document.getElementById("newCommentHeader") &&
      document.getElementById("newCommentText") &&
      document.getElementById("newCommentName")){
        raw = {
          header: document.getElementById("newCommentHeader"),
          text: document.getElementById("newCommentText"),
          name: document.getElementById("newCommentName"),
          articleId: this.state.id
        }
        service.appendComment(raw).then(function (result) {
          window.location.reload();
        });

    } else {
      alert("Все поля должны быть заполнены")
    }
  }


  render() {
    let status = localStorage.getItem('status') === "god" ? "" : "create-article__non-display" 
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
              <button className={status} onClick={() => this.delelteComment(comment)}></button>
            </div>
            )
        }


        <div className="comments__uppend" onClick={this.handleShow}>
          Написать комментарий
        </div>



        <Modal show={this.state.showNewComment} onHide={this.closeModal}>
          <div className="newComment__container">
            <h3>Комментарий</h3>

            <form>
              <input className="form-control" id="newCommentName" placeholder="Как вас звать?)"/>
              <input className="newComment__header form-control" id="newCommentHeader" placeholder="Заголовок"/>
              <textarea className="newComment__text form-control" id="newCommentText" type="text" placeholder="Комментарий"/>
              <button className="newComment__uppend btn btn-success" onClick={() => this.newCommentAppend()}> Добавить </button>	 
            </form>

          </div>

        </Modal>

        
      </div>
    );
  }
}

export default Comments;

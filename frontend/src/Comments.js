import  React, { Component }  from 'react';

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

      alert("Комментарий удален")
      window.location.reload()
    });
  }
  dateNow(time){
    let now = Date.now()
    let days = (now - time)/1000/3600//24
    if (days <= 1){
      return "Сегодня"
    } else if(days <= 3){
      return "Не позже трех дней"
    } else if(days <= 7){
      return "В течении недели"
    } else if(days <= 30){
      return "В течении месяца"
    } else {
      return "Давно"
    }
  }
  newCommentAppend(){
    if(document.getElementById("newCommentHeader").value &&
      document.getElementById("newCommentText").value &&
      document.getElementById("newCommentName").value){

      service.appendComment({
        header: document.getElementById("newCommentHeader").value,
        text: document.getElementById("newCommentText").value,
        name: document.getElementById("newCommentName").value,
        articleId: this.state.id
      }).then(function (result) {
        alert("Спасибо за комментаий!)")
        window.location.reload()
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
              <p className="comments__date">{this.dateNow(comment.date)}</p>
              <br/>
              <div className="comments__text"> {comment.text} </div>
              <div className="comments__author"> автор: {comment.author} </div>
              <button className={status} onClick={() => this.delelteComment(comment)}></button>
            </div>
            )
        }


        <div className="newComment__container">
          <h3>Комментарий</h3>
            <input className="form-control" id="newCommentName" placeholder="Как вас звать?)"/>
            <input className="newComment__header form-control" id="newCommentHeader" placeholder="Заголовок"/>
            <textarea className="newComment__text form-control" id="newCommentText" type="text" placeholder="Комментарий"/>
            <button className="newComment__uppend btn btn-success" onClick={() => this.newCommentAppend()}> Добавить </button>	 
        </div>


        
      </div>
    );
  }
}

export default Comments;

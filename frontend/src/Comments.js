import  React, { Component }  from 'react';


import  deletePNG from "./img/delete.png";
import  upgradePNG from "./img/upgrade.png";
import  Service  from  './Service';



const  service  =  new  Service();


class Comments extends Component{

  constructor(props) {
    super(props);
    this.state = {
      comments: [{
        header: "header",
        text: "text",
        author: "author",
        date: "date"
      },
      {
        header: "header",
        text: "text dsfanbas dnfkjlas dfnl;kj a lkja sdl;kh ljah;lksd lk asdlkjhasd lkg slkdghlk jasdglk hlkhd lkjadh gl;kdshglk hasdlkh l;kahdglkj;hdsfklshdglkjhaslkjghaslk;jdhglkj;ahs dhh jsahljkglja",
        author: "author",
        date: "date"
      }]
    };
  }
  componentDidMount(){
    var  self  =  this;
    let temp_arr = []
    let arr = []
    service.getCatalog().then(function (result) {
      let arr = []
      result.map(global => {
        temp_arr = []
        global.splice(1).map ( first => temp_arr.push(first[0]) )
        arr.push([global[0], temp_arr])
      })

      self.setState({catalogStructure: arr})
    });
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
        <div className="comments__uppend">
          Написать комментарий
        </div>
      </div>
    );
  }
}

export default Comments;

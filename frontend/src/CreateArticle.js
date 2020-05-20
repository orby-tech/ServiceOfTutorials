import  React, { Component }  from 'react';

import  Service  from  './Service';
import  ArticleCreator  from  './ArticleCreator';


const  service  =  new  Service();


class CreateArticle extends Component{

  constructor(props) {
    super(props);
    this.first_change = this.first_change.bind(this)
    this.second_change = this.second_change.bind(this)
   


    let catalog = []
    if(localStorage.getItem('catalog')){
      catalog = JSON.parse(localStorage.getItem('catalog'))
    }
    this.state = {
      catalog:  catalog,
      status:null,
      first_value: "",
      second_value: "selected",
      second_steck: [],
      type: "selected",
      temp_type: "selected",
      constructor: false,
      new_article: [],
      redaction: -1,
      no_link: "create-article__type-new-block-no-link form-control create-article__input",
      loading: true
    };
  }
  componentDidMount(){
    var  self  =  this;
    service.getCatalog().then(function (result) {
      self.setState({ catalog: result, loading: false })
    })

  }
  
  first_change (event) {
    this.setState({first_value: event.target.value});
    let target 
    for (let i = 0; i<this.state.catalog.length; i++) {
      if(event.target.value === this.state.catalog[i][0]) {
        target = this.state.catalog[i].slice(1)
        break;
      }
    }
    this.setState({second_steck: target})
  }
  second_change (event) {
    this.setState({second_value: event.target.value});
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { match: { params } } = this.props;
    if (params.pk !== this.state.opend) {
      this.setState({opend: params.pk});
    }
  }

  publicateArticle(){

    if (this.state.new_article[0][1] !== "header") {
      alert("Статья должна начинаться с Заголовока")
    } else{
      this.setState({loading: true})
      var  self  =  this;

      var raw = {
        "type": this.state.first_value,
        "under_type": this.state.second_value.toString(),
        "article": this.state.new_article
      }
      service.createArticle(raw).then(function (result) {
        self.setState({loading:false})
        alert("Статья добавлена, и на ходится на модерации,спасибо, удачного дня!)")
        window.location.reload();
      });
    }
  }

  render() {
    let styleOfSecondChange = this.state.second_steck.length !== 0
                      ? "custom-select mr-sm-2 create-article__input" 
                      : "create-article__non-display"
    let styleOfCreatorBlock = this.state.second_value !== "selected"
                      ? ""
                      : "create-article__non-display"
   


    if (this.state.loading) {
      return (
        <>
        <div className="cssload-container">
            <div className="cssload-zenith"></div>
        </div>
        </>
      )
    
    }  else return(
      <div className="create-article__container">




        <select  className="custom-select mr-sm-2 create-article__input" 
                 id = "inlineFormCustomSelect create-article__input" 
                 onChange={this.first_change}>
          <option value="selected">Направление</option>

          {this.state.catalog.map( global  =>
              <option value={global[0]}>{global[0]}</option>
          )}
        </select>



        <select  className={styleOfSecondChange}
                 id = "inlineFormCustomSelect create-article__input" 
                 onChange={this.second_change}>
          <option value="selected">Тема</option>

          {this.state.second_steck.map( global  =>
              <option value={global[0]}>{global[0]}</option>
          )}
        </select>
        <div className={styleOfCreatorBlock}>
            <ArticleCreator type={this.state.first_value} under_type={this.state.second_value} />
        </div>

      </div>
    );
  }
}

export default CreateArticle;

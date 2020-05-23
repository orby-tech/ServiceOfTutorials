import  React, { Component }  from 'react';

import  Service  from  './Service';
import  ArticleCreator  from  './ArticleCreator';
import  { FirstSelect } from './CreateArticlesElements/firstSelect.tsx'
import  { SecondSelect } from './CreateArticlesElements/SecondSelect.tsx'
const  service  =  new  Service();

interface ParentState {
  catalog:any[];
  loading: boolean;
  first_value: string;
  second_value: string;
  second_steck: any[];
  new_article: any[];
}

class CreateArticle extends Component<{}, ParentState>{

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
      first_value: "",
      second_value: "selected",
      second_steck: [],
      new_article: [],
      loading: true
    };
  }
  componentDidMount(){
    var  self  =  this;
    service.getCatalog().then(function (result) {
      self.setState({ catalog: result, loading: false })
    })

  }
  
  first_change  = ( title: string ) =>  {
    let target : any[];
    this.state.catalog.map( temp =>
      {if(title === temp[0]) target = temp.slice(1)}
    )

    this.setState({
      second_steck: target,
      first_value: title
    })
  }

  second_change  = ( title: string ) =>  {
    this.setState({second_value: title});
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
        <FirstSelect catalog={this.state.catalog} firstChange={this.first_change}/>

        <SecondSelect catalog={this.state.second_steck} secondChange={this.second_change}/>  
        
        <ArticleCreator type={this.state.first_value} under_type={this.state.second_value} />
      </div>
    );
  }
}

export default CreateArticle;

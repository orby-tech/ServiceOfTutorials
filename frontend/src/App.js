import  React from 'react';
import  './App.css';
import  './App.scss';
import  './css/NavBar.scss';
import  './css/Footer.css';

import  Start  from './Start'
import  NavBar  from './NavBar'
import  Footer   from './Footer'
import  Catalog    from './Catalog.tsx'
import  NewArticles  from './NewArticlesList'
import  TopArticles  from './TopArticlesList'
import  Article       from './Article'
import  ArticleRedactor  from './ArticleRedactor'
import  Admin          from './Admin.tsx'
import  CreateArticle  from './CreateArticle.tsx'
import  GlobalFinding  from './GlobalFind'
import  { Route }       from 'react-router-dom';
import  { BrowserRouter } from 'react-router-dom';

import  { Provider } from 'react-redux'
import  {  createStore } from 'redux'
import  { rootReducer } from './redux/rootReducer'
import DownloadComponent from './Download';


const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}

const store = createStore(rootReducer,
    persistedState)

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
function App() {
  
  return (
    <div className="App">
        <Provider store={store}>
        <BrowserRouter>
          <Route exact component={NavBar}/>


          <Route path="/" exact component={Start} />
          <Route path="/catalog" exact component={Catalog} />  
          <Route path="/newarticles" exact component={NewArticles} /> 
          <Route path="/toparticles" exact component={TopArticles} />          
          <Route path="/Article/:pk" exact component={Article} />
          <Route path="/ArticleRedactor/:pk" exact component={ArticleRedactor} />
          <Route path="/download" exact component={DownloadComponent} />
          <Route path="/globalFind" exact component={GlobalFinding} />

          <Route exact component={Footer}/>
          <div className="alt__footer"></div>
        </BrowserRouter>
        </Provider>
    </div>
  );
}


export default App;

import  {   StyleSheet, 
    View, 
    Text, 
    ShadowPropTypesIOS, 
    Button, 
    FlatList,
    TouchableOpacity,
    ScrollView,
    SafeAreaView } from "react-native"
import React, {useState, Component} from "react"
import  Service  from  './Service';
import  {TopicsList} from './TopicsList'

import  { setTopArticles, setAllCatalog } from './redux/actions'
import  { connect } from 'react-redux'

import  Article from './Article'
const  service  =  new  Service();

const sortByTop = ( temp:any[] ) => {
    let arr:any[] = []
    temp.map( global =>
        global.slice(1).map( first => 
            first[1].forEach( second  => {
                if(second[1] && second[2] !== "noDisplay"){
                        arr.push({
                            title: second[0],
                            id: second[1],
                            reit: second[3]
                        })
                }
            })   
        )
    )
    arr.sort(sortfunction)
    arr.reverse()
    return arr
}


function sortfunction(a:any, b:any){
    return (a.reit - b.reit)
    }

interface ParentState {
    list: any[],
    article: null,
    topArticles: any[]
}
class PRETopArticles extends Component<{}, ParentState>{
    constructor(props: any[]) {
        super(props);
        this.state = {
          list:  [],
          article: null
        };
      }
    componentDidMount(){
        let self = this
        if (!self.props.topArticles){
            if(!self.props.allCatalog){
                service.getCatalog().then(function (result) {

                console.log(true)
                    let arr:any[] = sortByTop(result)
                    self.setState ({list: arr})
                    self.props.dispatch(setTopArticles(arr));
                    self.props.dispatch(setAllCatalog(result))
                })
            } else {          
                
                let arr:any[] = sortByTop(self.props.allCatalog)
                self.setState ({list: arr})

                self.props.dispatch(setTopArticles(arr))
            
                    
            }
        } else {
            self.setState ({list: this.props.topArticles})
        }
    }
    reChange(id){
        this.setState({ article: id })

    }
      render(){
        
        if ( !this.state.article ){
            return(
                <ScrollView>
                    <SafeAreaView>
                        <FlatList
                            data={this.state.list}
                            renderItem={({ item }) => <TopicsList   title={ item.title }  
                                                                    onChange={ () => this.reChange(item.id) }/>}
                            keyExtractor={ item => item.id }
                        />
                    </SafeAreaView>
                </ScrollView>
            )
        } else {
            return (

                <Article id={{"id": this.state.article}} />
            )
        }
        
      }

}
const mapStateToProps = (state) => {
    return {
      topArticles: state.topArticles,
      allCatalog: state.allCatalog
    };
  }
const TopArticles = connect(mapStateToProps)(PRETopArticles);
export default TopArticles;
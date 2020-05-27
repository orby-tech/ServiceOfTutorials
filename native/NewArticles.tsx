import  {   StyleSheet, 
    View, 
    Text, 
    ShadowPropTypesIOS, 
    Button, 
    ScrollView,
    FlatList,
    TouchableOpacity,
    SafeAreaView } from "react-native"
import React, {useState, Component} from "react"
import  Service  from  './Service';
import  {TopicsList} from './TopicsList'


import  { setNewArticles, setAllCatalog } from './redux/actions'
import  { connect } from 'react-redux'


import  Article from './Article'
const  service  =  new  Service();

const sortByNew = (result: any[]):any[] => {
    let arr: any[] = []
    result.map( global =>
        global.slice(1).forEach( first =>
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
    return (a.id - b.id)
    }

interface ParentState {
    list: any[],
    article: string | null

}

class PRENewArticles extends Component<{}, ParentState>{
    constructor(props:any[]) {
        super(props);
        this.state = {
          list:  [],
          article: null,
        };
      }
    componentDidMount(){
        let self = this
        if (!self.props.newArticles){
            if(!self.props.allCatalog){
                service.getCatalog().then(function (result) {
                    let arr:any[] = sortByNew(result)
                    self.setState ({list: arr})
                    self.props.dispatch(setNewArticles(arr))
                    self.props.dispatch(setAllCatalog(result))
                })
            } else {          
                
                let arr:any[] = sortByNew(self.props.allCatalog)
                self.setState ({list: arr})

                self.props.dispatch(setNewArticles(arr))  
            }
        } else {
            self.setState ({list: this.props.newArticles})
        }
    }
    reChange(id:string):void{
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

interface PropsRedux {
    state:any[],
    newArticles: any[],
    allCatalog: any[],


}
const mapStateToProps:React.FC<PropsRedux> = (state):any => {
    return {
      newArticles: state.newArticles,
      allCatalog: state.allCatalog
    };
  }
const NewArticles = connect(mapStateToProps)(PRENewArticles);
  
  export default NewArticles;
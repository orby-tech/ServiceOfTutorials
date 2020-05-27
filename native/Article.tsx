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
import { ArticlesBlock } from "./ArticlesBlock"
import  Service  from  './Service';
const  service  =  new  Service();

interface ParentState{
    article: any[],
    id: any[],
    state:any
}

class Article extends Component<{}, ParentState>{
    constructor(props:any[]) {
        super(props);
        this.state = {
            article: []
            
        };
    }
    componentDidMount(){
        let self = this
        service.getArticle({id: this.props.id.id}).then(function (result) {  
            self.setState ({article: result})
        });
    }
    render(){
        return(
                <FlatList
                        data={this.state.article}                        
                        renderItem={({ item }) => <ArticlesBlock article = { item } />}
                        keyExtractor={item => item.title}/>                    

        )
    }  
      
}

export default Article;

  const styles = StyleSheet.create({
    item: {
        fontSize: 22,
        margin: 10,
        padding:10,
        backgroundColor: "rgb(230, 230, 200)",
        textAlign: 'left',
        borderRadius: 5,
    }
})
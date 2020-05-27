import  {   StyleSheet, 
    View, 
    Text, 
    ShadowPropTypesIOS, 
    Button, 
    ScrollView,
    FlatList,
    TouchableOpacity,
    SectionList,
    SafeAreaView } from "react-native"
import React, {useState, Component} from "react"

import  { connect } from 'react-redux'
import  { setAllCatalog, setCatalog } from './redux/actions'


import  Service  from  './Service';
import  { CatalogList } from './CatalogList'
import  Article from './Article'
const  service  =  new  Service();
const styles = StyleSheet.create({
    link1: {
        fontSize: 22,
        margin: 2,
        padding:10,
        backgroundColor: "rgb(230, 230, 200)",
        textAlign: 'left',
        borderRadius: 5,
    },
    link2: {
        fontSize: 22,
        margin: 2,
        padding:10,
        backgroundColor: "rgb(200, 230, 230)",
        textAlign: 'left',
        borderRadius: 5,
    },
    link3: {
        fontSize: 22,
        margin: 2,
        padding:10,
        backgroundColor: "rgb(230, 200, 230)",
        textAlign: 'left',
        borderRadius: 5,
    },
})
interface ParentState {
    catalog:any[],
    type: string,
    underType: string,
    list: any[],
    result: any[],
    lastType: string,
    article: any[],
    state: any[]
  }
const showCatalog = (catalog:any[]) =>{
    let arr:any[] = []
    catalog.map( global =>
        {
            arr.push({
                title: global[0]
            })
        }
    )
    return arr
}
const changeUnderType = (catalog:any[], id:any) => {
    let arr:any[] = []
    for( let i = 0; i< catalog.length; i++){
        console.log(catalog[i][0], id)
        if(catalog[i][0] === id.title){
            catalog[i].slice(1).map( first => 
                    arr.push({
                        title: first[0]
                    })
                )
            break;
        }
    }
    return arr
} 
const changeLastType = (catalog:any[], id:any, underType:string) => {
    let arr:any[] = []
    for( let i = 0; i< catalog.length; i++){
        if(catalog[i][0] === underType){
            for( let j = 1; j< catalog[i].length; j++){
                if(catalog[i][j][0] === id.title){
                    catalog[i][j].slice(1)[0].map( first => 
                            {
                                if( first[2] !== "noDisplay"){
                                    arr.push({
                                        title: first[0],
                                        id: first[1],
                                        reit: first[3]
                                    })
                                }
                            }
                        )
                    break;
                }
            }
            break;
        }
    }
    return arr
}

class PRECatalog extends Component<{}, ParentState>{
    constructor(props:any[]) {
        super(props);
        this.state = {
          list: [],
          catalog: [],
          type: "Каталог",
          underType: "",
          lastType: "",
          article: null
        };
      }
    componentDidMount(){
            let self = this
            if (!self.props.catalog){
                if(!self.props.allCatalog){
                    service.getCatalog().then(function (result) { 
                        let arr:any[] = showCatalog(result)
                        
                        self.setState ({list: arr, catalog: result})
                        self.props.dispatch(setCatalog(arr))
                        self.props.dispatch(setAllCatalog(result))
                    });
                } else {
                    console.log(this.props.catalog)
                    let arr:any[] = showCatalog(this.props.allCatalog)
                    self.setState ({list: arr, catalog: this.props.allCatalog})
                    self.props.dispatch(setCatalog(arr))
                }
                
            } else {
                self.setState ({list: this.props.catalog, catalog: this.props.allCatalog})
            }
        
    }
        

    toCatalog(){
        let arr = showCatalog(this.state.catalog)
        this.setState ({list: arr, underType: "", lastType: "", article:null })
    }
    toUnderType(){
        let arr = changeUnderType(this.state.catalog, {title: this.state.underType})
        this.setState ({ list: arr, lastType: "", article: null })
    }
    toLastType(){
        let arr = changeLastType(this.state.catalog, {title: this.state.lastType}, this.state.underType)
        this.setState ({ list: arr, article: null })
    }
    reChange(id:any){
        console.log(id)
        if(this.state.underType === ""){
            let arr:any[] = changeUnderType (this.state.catalog, id)

            this.setState({ list: arr, underType: id.title })
        } else if(this.state.lastType === "") {
            let arr:any[] = changeLastType (this.state.catalog, id, this.state.underType)

            this.setState({ list: arr, lastType: id.title })
        } else {
            console.log(id)
            this.setState({ article: id })
        }
    }
    navigator(){
        if(this.state.underType === ""){
            return(
                <View>             
                    <TouchableOpacity
                        style={styles.link1}
                        onPress={() => this.toCatalog()}>
                        <Text> {this.state.type} </Text>
                    </TouchableOpacity>
                </View>
            )
        } else if(this.state.lastType === ""){
            return(
                <View>             
                    <TouchableOpacity
                        style={styles.link1}
                        onPress={() => this.toCatalog()}>
                        <Text> {this.state.type} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.link2}
                        onPress={() => this.toUnderType()}>
                        <Text> {this.state.underType} </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return(   
                <View>             
                    <TouchableOpacity
                        style={styles.link1}
                        onPress={() => this.toCatalog()}>
                        <Text> {this.state.type} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.link2}
                        onPress={() => this.toUnderType()}>
                        <Text> {this.state.underType} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.link3}
                        onPress={() => this.toLastType()}>
                        <Text> {this.state.lastType} </Text>
                    </TouchableOpacity>
                </View>
                )       
            }

    }

    contentBlock() {
        if ( !this.state.article ) { return(
            <ScrollView>
                <FlatList
                        data={this.state.list}
                        
                        renderItem={({ item }) => 
                            <CatalogList   
                                title={ item }  
                                onChange={ () => this.reChange(item) }/>}
                        keyExtractor={item => item.title}
                    />
                    
            </ScrollView>
        )} else {
            return(

            <ScrollView>
                <Article id={this.state.article} />

            </ScrollView>
            )
        }
    }
    render(){
        return(
            <ScrollView>
                {this.navigator()}
                {this.contentBlock()}
                
            </ScrollView>
        )
    }

}
const mapStateToProps = (state) => {
    return {
      catalog: state.catalog,
      allCatalog: state.allCatalog
    };
  }
const Catalog = connect(mapStateToProps)(PRECatalog);
  
  export default Catalog;
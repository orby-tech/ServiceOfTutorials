import  {   StyleSheet, 
    View, 
    Text, 
    ShadowPropTypesIOS, 
    Button, 
    FlatList,
    TouchableOpacity,
    SafeAreaView } from "react-native"
import React, {useState, Component} from "react"


interface TitleProps{
    article: any[]
}

export const ArticlesBlock: React.FC<TitleProps> = props => {
    let article = props.article
    if(article[1] === "header") {
        return (
                <Text style={styles.header}>{article[0]}</Text>
        )
    } else if(article[1] === "code") {
        return (
                
                <Text style={styles.code}>{article[0]}</Text>
        )
    } else if(article[1] === "link") {
        return (
            <TouchableOpacity>
                <Text style={styles.link}>{article[0]}</Text>
            </TouchableOpacity>
        )
    } else return (
            <Text style={styles.item}>{article[0]}</Text>
    );
  }  

  const styles = StyleSheet.create({
    item: {
        fontSize: 22,
        margin: 10,
        padding:10,
        textAlign: 'left',
        borderRadius: 5,
    },
    header: {
        fontSize: 24,
        margin: 20,
        padding: 20,
        textAlign: 'center',
        borderRadius: 5,
    },
    code: {
        fontSize: 20,
        color:  "yellow",
        margin: 10,
        padding: 20,
        backgroundColor: "rgb(47, 79, 79)",
        textAlign: 'left',
        borderRadius: 5,
    },
    link: {
        fontSize: 20,
        color:  "blue",
        margin: 10,
        padding: 20,
        backgroundColor: "rgba(205, 133, 63, 0.5)",
        textAlign: 'right',
        borderRadius: 5,
    },
})
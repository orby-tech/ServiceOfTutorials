import React, {useState} from "react"
import  {   StyleSheet, 
            View, 
            Text, 
            ShadowPropTypesIOS, 
            Button, 
            ScrollView,
            FlatList,
            TouchableOpacity,
            SafeAreaView } from "react-native"

import { About } from "./About"
import  NewArticles  from "./NewArticles"
import  TopArticles  from "./TopArticles"
import Catalog from "./Catalog"
interface ContentProps {
    title: string
}

export const Content: React.FC<ContentProps> = props => {
    if (props.title === "О проекте"){
        return ( <About /> )
    } else if (props.title === "Новые статьи"){
        return ( <NewArticles /> )
    } else if (props.title === "Лучшие статьи"){
        return ( <TopArticles /> )

    } else if (props.title === "Каталог"){
        return (<Catalog /> )
    } else if (props.title === ""){

    } else if (props.title === ""){
    }else {return (
        <View>
            <Text> {props.title} </Text>
        </View>
    )}
}
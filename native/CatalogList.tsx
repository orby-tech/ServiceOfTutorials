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
    title: string,
    onChange(title:string): void
}

export const CatalogList: React.FC<TitleProps> = props => {
    let title = props.title.title
    
    const onPress = () => { props.onChange(props.title.id) }

    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                >
                <Text style={styles.point}>{title}</Text>
            </TouchableOpacity>
      </View>
    );
  }  
  const styles = StyleSheet.create({
    point: {
        fontSize: 24,
        margin: 10,
        padding:10,
        backgroundColor: "rgb(250, 250, 250)",
        textAlign: 'left',
        borderRadius: 5,
    }
})
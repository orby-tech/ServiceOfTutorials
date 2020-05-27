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

export const TopicsList: React.FC<TitleProps> = props => {
    let title = props.title
    
    const onPress = () => { props.onChange(title) }

    return (
        <View>
            <TouchableOpacity
            style={styles.item}
                onPress={onPress}
                >
            <Text>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }  

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
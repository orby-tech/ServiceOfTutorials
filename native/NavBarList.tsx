import React, {useState} from "react"
import  {   StyleSheet, 
            View, 
            Text, 
            ShadowPropTypesIOS, 
            Button, 
            FlatList,
            TouchableOpacity,
            SafeAreaView } from "react-native"


interface TitleProps{
    title: string,
    onChange(title:string): void
}

export const Item: React.FC<TitleProps> = props => {
    let title = props.title
    
    const onPress = () => { props.onChange(title) }

    return (
        <View style={styles.item}>
            <TouchableOpacity
                onPress={onPress}
                >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }  



const styles = StyleSheet.create({
    navbar: {
        paddingTop: 23,
        paddingLeft: 1,
        paddingRight:2,
        backgroundColor: '#3949ab',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    text: {
        color: 'white',
        fontSize: 20,
        justifyContent: 'flex-start',

    },
    navButton: {
        marginVertical: 10,
        justifyContent: 'center',
    },
    item: {
        padding: 8,
        margin: 2,
        backgroundColor: '#F6F2F2',
        justifyContent: 'flex-end',
    },
    title : {
        fontSize: 18,
        justifyContent: 'flex-end',
    }
})
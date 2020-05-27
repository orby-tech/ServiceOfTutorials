import React, {useState} from "react"
import  {   StyleSheet, 
            View, 
            Text, 
            ShadowPropTypesIOS, 
            Button, 
            FlatList,
            TouchableOpacity,
            SafeAreaView } from "react-native"
import {Item} from "./NavBarList" 

interface NavBarProps{
   onChange(title:string): void
  }

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Каталог',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Новые статьи',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Лучшие статьи',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d42',
        title: 'О проекте',
    },
];


export const NavBar: React.FC<NavBarProps> = props => {
    let [show, setShow] = useState<boolean>(true)
    let [title, setTitle] = useState<string>("Каталог")


    const reShow = () => { setShow(!show) }
    const reChange = ( title: string ) => { 
        setShow(!show);
        setTitle(title) 

        props.onChange(title)
    }


    if ( !show ) {return (
        <View style={styles.navbar}>
            <Text 
                style={styles.text}>                 
                {title} 
            </Text>
            <Button 
                style={styles.navButton}
                title="меню"
                onPress={reShow} />
        </View>
    )} else {return(
        <View>
            
            <View style={styles.navbar}>
                <Text 
                    style={styles.text}>                 
                    {title} 
                </Text>
                <Button 
                    style={styles.navButton}
                    title="меню"
                    onPress={reShow} />
            </View>
            <View>
                <SafeAreaView>
                
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item title={item.title}  onChange={reChange}/>}
                        keyExtractor={ item => item.id }
                    />
                </SafeAreaView>
            </View>
        </View>

    )}
}




const styles = StyleSheet.create({
    navbar: {
        paddingTop: 23,
        paddingLeft: 10,
        paddingRight:2,
        backgroundColor: 'rgb(180, 170, 200)',
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
        margin: 10,
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
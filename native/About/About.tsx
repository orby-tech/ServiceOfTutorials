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

export const About: React.FC = props => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}> О проекте </Text>
            <Text style={styles.text}> Не относитесь к этому ресурсу как к источнику капитальных знаний. </Text>
            <Text style={styles.text}> Статьи опубликованные здесь предназначенны исключительно для изи-старта. </Text>
            
            <Text style={styles.title}> Вы не станете профессионалом по этим статьям! </Text>
            <Text style={styles.text}> Но вы сделаете первый шаг, а это уже пол дела. </Text>

            <Text style={styles.title}> Этот ресурс - не учебник! </Text>
            <Text style={styles.text}> Безусловно, я стараюсь делать его максимально правильным и подробным. </Text>
            <Text style={styles.text}> Но у данного подхода, естественно, есть явные минусы, я в курсе них. </Text>

            <Text style={styles.littleTitle}> И хочу, чтобы вы знали их тоже: </Text>
            <View style={styles.listContainer}> 
                <Text style={styles.list}> Недостаточность информации </Text>
                <Text style={styles.list}> Необходимость дополнения </Text>
                <Text style={styles.list}> Не развернутость </Text>

            </View>

            <Text style={styles.text}> Мы будем рады дополнению и расширению данной базы </Text>
            <Text style={styles.text}> Мы будем рады узнать об ошибках </Text>

            <Text style={styles.title}> Начни прямо сейчас! </Text>
            <Text style={styles.text}> </Text>
            <Text style={styles.text}> </Text>
            <Text style={styles.text}> </Text>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        fontSize: 18,
        margin: 10,

        textAlign: 'left',

    },
    title : {
        fontSize: 26,
        margin: 20,
        
        textAlign: 'center',
    },
    list : {
        justifyContent: 'center',
        marginRight: 20,
        fontSize: 20,
        color: 'grey'
    },
    littleTitle : {

        textAlign: 'center',
        fontSize: 20,
        margin: 15,
    },
    listContainer : {
        alignItems: 'flex-end',
        margin: 20
    }
})
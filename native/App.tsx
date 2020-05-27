import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';



import  { Provider } from 'react-redux'
import  { applyMiddleware, createStore } from 'redux'

import AsyncStorage from '@react-native-community/async-storage';

import { NavBar } from "./NavBar"
import { Content } from "./Content"

import  { rootReducer } from './redux/rootReducer'



const store = createStore(rootReducer)



export default function App() {

  let [title, setTitle] = useState<string>("О проекте")
  const changeTitle = ( title: string ) => {
    setTitle(title)
  }
  return (

    <Provider store={store}>
      <ScrollView style={styles.container}>
          <NavBar onChange={changeTitle}/>
          <Content title={title} />
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

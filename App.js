// console.disableYellowBox = true;
// require('ReactFeatureFlags').warnAboutDeprecatedLifecycles = false;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator  } from 'react-navigation'
import DeckAdd from './components/DeckAdd'
import  { gray_back, gray_black, white } from './utils/colors'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { setNotification } from './utils/helpers';


const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: gray_black
  }
}

const MainNavigator = StackNavigator({
  Home:{
    screen: Decks,
    navigationOptions,
  },
  Deck:{
    screen: Deck,
    navigationOptions,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions,
  }
})


export default class App extends React.Component {

  componentDidMount () { 
    setNotification()
  }

  render() {
    return (
      <Provider store={ createStore(reducer) } >
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

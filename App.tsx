import axios from 'axios';
import React ,{ useState, useEffect, Children} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity   } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { Provider } from 'react-redux';
import store from './Redux/DriversService';

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  driverContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FEF3F4',
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
    position: 'relative',
  },
  driverId: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  attributeName: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  attributeValue: {}
  ,
  // ,
  // header: {
  //   backgroundColor: 'white',
  //   height: 60,
  //   padding: 15,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderBottomWidth: 1,
  //   borderBottomColor: 'lightgrey'
  // },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  greetingText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gill Sans'
  },
  header: {
    height: 120,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10
    },
    header2Text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    width: 30,
    height: 30, alignItems: 'center',
    justifyContent: 'center'
    },
    buttonText: {
    fontWeight: 'bold',
    fontSize: 17
    },
});

export default App;


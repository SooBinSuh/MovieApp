import React, {useState} from 'react';



import {View} from 'react-native';
import { IGenre } from './@types/IGenre';
import { IMovie } from './@types/IMovie';
import Home from './views/home/Home';
import Genre from './views/genre/Genre';
import Movie from './views/movie/Movie';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './@types/Stacks';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from './views/user/User';


const MainStack = createNativeStackNavigator<MainStackParamList>();
const TabNavigator = createBottomTabNavigator();

const MainStackScreen = ()=>{
  return(
    <MainStack.Navigator initialRouteName='Home' >
      <MainStack.Screen name='Home' component={Home} options={{headerShown:false}}  />
      <MainStack.Screen name='Genre' component={Genre}/>
      <MainStack.Screen name='Movie' component={Movie}/>
    </MainStack.Navigator>
  )
}

const App = () => {
  return(
    <NavigationContainer>
    <TabNavigator.Navigator screenOptions={{headerShown:false}}>
      <TabNavigator.Screen name='Main' component={MainStackScreen}/>
      <TabNavigator.Screen name='User' component={User} />
    </TabNavigator.Navigator>
  </NavigationContainer>
  );

};

export default App;

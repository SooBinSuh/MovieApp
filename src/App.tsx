import React, {useState} from 'react';
import {Provider} from 'react-redux';

import {View} from 'react-native';
import {IGenre} from './@types/IGenre';
import {IMovie} from './@types/IMovie';
import Home from './views/home/Home';
import Genre from './views/genre/Genre';
import Movie from './views/movie/Movie';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './@types/Stacks';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './views/user/User';
import {ColorConstants} from './constants/Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import { store } from './store/rootStore';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const TabNavigator = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        // options={{
        //   title: 'Movie Genres',
        // }}
      />
      <MainStack.Screen
        name="Genre"
        component={Genre}
        // options={{title: 'Movies'}}
      />
      <MainStack.Screen
        name="Movie"
        component={Movie}
        // options={({route}) => ({title: route.params.movie?.title})}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            {/* <MainStackScreen/> */}
            <TabNavigator.Navigator
              screenOptions={
                {
                  // unmountOnBlur:true
                }
              }>
              <TabNavigator.Screen
                name="Main"
                component={MainStackScreen}
                options={{headerShown: false}}
              />
              <TabNavigator.Screen
                name="User"
                component={User}
                options={{headerShown: false}}
              />
            </TabNavigator.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </Provider>
  );
};

export default App;

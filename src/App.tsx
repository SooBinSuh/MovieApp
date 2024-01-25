import React, {useState} from 'react';
import {Provider} from 'react-redux';

import {View, SafeAreaView} from 'react-native';
import {IGenre} from './@types/IGenre';
import {IMovie} from './@types/IMovie';
import Home from './views/home/Home';
import Genre from './views/genre/Genre';
import Movie from './views/movie/Movie';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList, UserStackParamList} from './@types/Stacks';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './views/user/User';
import {ColorConstants} from './constants/Constants';

import {store} from './store/rootStore';
import Search from './views/search/Search';
import Icon from 'react-native-vector-icons/Ionicons';

const MainStack = createNativeStackNavigator<MainStackParamList>();
const UserStack = createNativeStackNavigator<UserStackParamList>();
const TabNavigator = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <MainStack.Screen name="Genre" component={Genre} />
      <MainStack.Screen name="Movie" component={Movie} />
      <MainStack.Screen
        name="Search"
        component={Search}
        options={{headerTitle:'Search',headerBackTitleVisible:false}}
      />
    </MainStack.Navigator>
  );
};
const UserStackScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="User" component={User} options={{headerShown:false}}/>
      <UserStack.Screen name="Movie" component={Movie} />
    </UserStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <TabNavigator.Navigator
            screenOptions={({route})=>({
              tabBarIcon:({focused, color,size})=>{
                let iconName='';

                if(route.name === 'MoviesTab'){
                  iconName = focused ? 'videocam':'videocam-outline'
                } else if(route.name === 'UserTab'){
                  iconName = focused ? 'person' : 'person-outline'
                }
                return <Icon name={iconName} size={size} color={color}/>
              }
            })}
            >
              <TabNavigator.Screen
                name="MoviesTab"
                component={MainStackScreen}
                options={{headerShown: false}}
              />
              <TabNavigator.Screen
                name="UserTab"
                component={UserStackScreen}
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

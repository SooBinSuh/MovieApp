import React, { useEffect } from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {FontConstants, ColorConstants} from '../../constants/Constants';
import ScrollContainer from '../../containers/ScrollContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../@types/Stacks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootStore';
import { addFav } from '../../store/userStore';


type MovieProps = NativeStackScreenProps<MainStackParamList,'Movie'>;

const Movie = (props: MovieProps) => {
  const _movie: IMovie|undefined = props.route.params.movie;
  const {favs} = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('favs change:',favs);
  },[favs])
  console.log('render movie:',_movie?.title,'_id:',_movie?.id);
  console.log('favs:',favs);

  const goBackNavigation = ()=>{
    if (_movie !== undefined){
      dispatch(addFav(_movie));
    }
  }
  return (
    <View style={{flex:1}}>
      <Button title='test' onPress={goBackNavigation}/>
      <Text>{`${favs}`}</Text>
    <ScrollContainer>
      {props.route.params?.movie ? (
        <View>
          <Text style={styles.overview}>{props.route.params.movie.overview}</Text>
        </View>
      ) : 
      <Text>undefined!</Text>
      }
    </ScrollContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    fontSize: FontConstants.sizeRegular,
    color: ColorConstants.font,
  },
});

export default Movie;

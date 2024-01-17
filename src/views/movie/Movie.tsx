import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {FontConstants, ColorConstants} from '../../constants/Constants';
import ScrollContainer from '../../containers/ScrollContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../@types/Stacks';

type MovieProps = NativeStackScreenProps<MainStackParamList,'Movie'>;

const Movie = (props: MovieProps) => {
  const _movie: IMovie|undefined = props.route.params.movie;

  console.log('render movie:',_movie?.title,'_id:',_movie?.id);
  const goBackNavigation = ()=>{
    props.navigation.goBack();
  }
  return (
    <View style={{flex:1}}>
      <Button title='test' onPress={goBackNavigation}/>
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

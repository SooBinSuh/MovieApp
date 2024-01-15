import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {FontConstants, ColorConstants} from '../../constants/Constants';
import ScrollContainer from '../../containers/ScrollContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../@types/Stacks';

// interface MovieProps {
//   movie: IMovie | undefined;
//   backToGenres: () => void;
// }
type MovieProps = NativeStackScreenProps<MainStackParamList,'Movie'>;

const Movie = (props: MovieProps) => {
  console.log('route:',props.route.path);
  return (
    <ScrollContainer>
      {props.route.params?.movie ? (
        <View>
          <Text style={styles.overview}>{props.route.params.movie.overview}</Text>
        </View>
      ) : 
      <Text>undefined!</Text>
      }
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  overview: {
    fontSize: FontConstants.sizeRegular,
    color: ColorConstants.font,
  },
});

export default Movie;

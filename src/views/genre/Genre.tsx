import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {IGenre} from '../../@types/IGenre';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';

import ScrollContainer from '../../containers/ScrollContainer';
import { getMovieByGenreId } from '../../services/movieService';
import { ColorConstants, FontConstants, SizeConstants } from '../../constants/Constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../@types/Stacks';


// interface GenreProps {
//   genre: IGenre | undefined;
//   backToHome: () => void;
//   chooseMovie: (movie: IMovie) => void;
// }

type GenreProps = NativeStackScreenProps<MainStackParamList,'Genre'>;

const Genre = (props: GenreProps) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (typeof props.route.params.genre !== 'undefined') {
      setMovies(getMovieByGenreId(props.route.params.genre.id));
    }
  }, [props.route.params.genre]);

  return (
    <ScrollContainer>
      {movies.map(movie => {
        return (
          <Pressable key={movie.id} onPress={() => props.navigation.navigate('Movie',{movie:movie})}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </Pressable>
        );
      })}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  movieTitle: {
    fontSize: FontConstants.sizeRegular,
    marginBottom: SizeConstants.paddingSmall,
    padding: SizeConstants.paddingLarge,
    backgroundColor: ColorConstants.backgroundLight,
    color: ColorConstants.font,
  },
});

export default Genre;

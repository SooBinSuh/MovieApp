import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {IGenre} from '../../@types/IGenre';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';

import ScrollContainer from '../../containers/ScrollContainer';
// import {getMovieByGenreId} from '../../services/movieService';
import {
  ColorConstants,
  FontConstants,
  SizeConstants,
} from '../../constants/Constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {useAppSelector} from '../../hooks';
import {useGetMoviesByGenreIdQuery} from '../../services/movieService';

type GenreProps = NativeStackScreenProps<MainStackParamList, 'Genre'>;

const Genre = (props: GenreProps) => {
  // const [movies, setMovies] = useState<IMovie[]>([]);
  const {favs} = useAppSelector(state => state.user);

  const {data, error} = useGetMoviesByGenreIdQuery(props.route.params.genre.id);

  console.log('data_length:', data?.results.length );
  const onGenrePress = (movie: IMovie) => {
    console.log('ongenrepress! movie:', movie);
    props.navigation.navigate('Movie', {movie: movie});
  };
  return (
    <>
      {error !== undefined ? (
        <Text>{'error'}
          {/* {'error' in error ? (error.data as any) : JSON.stringify(error)} */}
        </Text>
      ) : data ? (
        <ScrollContainer>
          {data.results.map(movie => {
            return (
              <Pressable key={movie.id} onPress={() => onGenrePress(movie)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {favs[movie.id] !== undefined && <Text>👍</Text>}
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollContainer>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  movieTitle: {
    flex: 1,
    fontSize: FontConstants.sizeRegular,
    marginBottom: SizeConstants.paddingSmall,
    padding: SizeConstants.paddingLarge,
    backgroundColor: ColorConstants.backgroundLight,
    color: ColorConstants.font,
  },
});

export default Genre;

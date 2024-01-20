import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import {IGenre} from '../../@types/IGenre';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';

import ScrollContainer from '../../containers/ScrollContainer';
import {getMovieByGenreId} from '../../services/movieService';
import {
  ColorConstants,
  FontConstants,
  SizeConstants,
} from '../../constants/Constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {useAppSelector} from '../../hooks';

type GenreProps = NativeStackScreenProps<MainStackParamList, 'Genre'>;

const Genre = (props: GenreProps) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const {favs} = useAppSelector(state => state.user);


  useEffect(() => {
    console.log('fetch data for genre ', props.route.params.genre);
    const fetchData = async () => {
      setMovies(await getMovieByGenreId(props.route.params.genre.id));
    };
    if (typeof props.route.params.genre !== 'undefined') {
      console.log('will fetch');
      fetchData();
    }
  }, [props.route.params.genre]);

  const onGenrePress = (movie: IMovie) => {
    console.log('ongenrepress! movie:', movie);
    props.navigation.navigate('Movie', {movie: movie});
  };
  return (
    <ScrollContainer>
      {movies.map(movie => {
        return (
          <Pressable key={movie.id} onPress={() => onGenrePress(movie)}>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              {favs[movie.id] !== undefined && <Text>👍</Text>}
              <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  movieTitle: {
    flex:1,
    fontSize: FontConstants.sizeRegular,
    marginBottom: SizeConstants.paddingSmall,
    padding: SizeConstants.paddingLarge,
    backgroundColor: ColorConstants.backgroundLight,
    color: ColorConstants.font,
  },
});

export default Genre;

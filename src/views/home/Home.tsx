import React, {useState, useEffect} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  FlatList,
  View,
  Image,
} from 'react-native';
import {IGenre} from '../../@types/IGenre';

import ScrollContainer from '../../containers/ScrollContainer';
import Header from '../../components/Header';
import {
  ColorConstants,
  FontConstants,
  SizeConstants,
} from '../../constants/Constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {NavigationContainer} from '@react-navigation/native';
import {
  useGetGenresQuery,
  useGetMoviesByGenreIdQuery,
} from '../../services/movieService';
import {useDispatch} from 'react-redux';
import {IMovie} from '../../@types/IMovie';
import {APIConstants} from '../../constants/APIConstants';

type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home = (props: HomeProps) => {
  const {data} = useGetGenresQuery();

  useEffect(() => {
    console.log('HOME navigation:', props.navigation.isFocused());
  }, [props.navigation]);

  const onGenrePress = (genre: IGenre) => {
    console.log('ongenrepress');
    props.navigation.navigate('Genre', {genre: genre});
  };
  return (
    <ScrollContainer>
      {/* <Button title='test me' onPress={onButtonPress}/> */}
      {data !== undefined
        ? data.genres.map(genre => {
            return (
              // <Pressable key={genre.id} onPress={() => onGenrePress(genre)}>
              <View key={genre.id}>
                <Text style={styles.genreTitle}>{genre.name}</Text>
                <GenreMovieStrip movieId={genre.id} />
              </View>
            );
          })
        : null}
    </ScrollContainer>
  );
};

const GenreMovieStrip = (props: {movieId: number}) => {
  const {data, error, isLoading} = useGetMoviesByGenreIdQuery(props.movieId);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {error !== undefined ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : (
        <FlatList
          horizontal={true}
          data={data?.results}
          renderItem={({item, index}) => (
            <MovieItem
              item={item}
              isFirst={index == 0}
              isLast={item === data?.results[data.results.length - 1]}
            />
          )}
          keyExtractor={item => `${item.id}`}
          // style={{paddingHorizontal:20}}
        />
      )}
    </>
  );
};

const MovieItem = (props: {
  item: IMovie;
  isFirst: boolean;
  isLast: boolean;
}) => {
  return (
    <View
      style={{
        width: 180,
        marginVertical: 8,
        marginStart: props.isFirst ? 0 : 8,
        marginEnd: props.isLast ? 0 : 8,
      }}>
      <Image
        resizeMode="cover"
        style={styles.mediumLogo}
        src={`${APIConstants.IMAGE_URL}${props.item.poster_path}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genreTitle: {
    fontSize: FontConstants.sizeTitle,
    marginTop: SizeConstants.paddingRegular,
    padding: SizeConstants.paddingSmall,
    color: ColorConstants.font,
    fontWeight: FontConstants.weightBold,
  },
  mediumLogo: {
    borderRadius: 10,
    flex: 1,
    width: 180,
    height: 252,
  },
});

export default Home;

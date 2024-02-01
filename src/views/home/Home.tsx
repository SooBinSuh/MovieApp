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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {
  useGetGenresQuery,
  useGetMoviesByGenreIdQuery,
} from '../../services/movieService';
import {useDispatch, useSelector} from 'react-redux';
import {IMovie} from '../../@types/IMovie';
import {APIConstants} from '../../constants/APIConstants';
import {useAppSelector} from '../../hooks';
import HeaderContainer from '../../containers/HeaderContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootState} from '../../store/rootStore';

type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home = (props: HomeProps) => {
  const {data} = useGetGenresQuery();

  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.rootContainer}>
      <HeaderContainer title={`Hello, ${user.name}`}>
        <Icon
          name="search"
          size={30}
          color={ColorConstants.black300}
          onPress={() => props.navigation.navigate('Search')}
        />
      </HeaderContainer>
      <ScrollContainer>
        {data !== undefined
          ? data.genres.map(genre => {
              return (
                <View key={genre.id}>
                  <Text style={styles.genreTitle}>{genre.name}</Text>
                  <GenreMovieStrip movieId={genre.id} />
                </View>
              );
            })
          : null}
      </ScrollContainer>
    </View>
  );
};

const GenreMovieStrip = (props: {movieId: number}) => {
  const {data, error, isLoading} = useGetMoviesByGenreIdQuery(props.movieId);

  const {favs} = useAppSelector(state => state.user);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  const onMoviePress = (movie: IMovie) => {
    navigation.navigate('Movie', {movie: movie});
  };
  return (
    <>
      {error !== undefined ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : (
        <FlatList
          horizontal={true}
          data={data?.results}
          renderItem={({item, index}) => (
            <Pressable onPress={() => onMoviePress(item)}>
              <MovieItem
                item={item}
                isFirst={index == 0}
                isLast={item === data?.results[data.results.length - 1]}
                isFav={favs[item.id] !== undefined}
              />
            </Pressable>
          )}
          keyExtractor={item => `${item.id}`}
        />
      )}
    </>
  );
};

export const MovieItem = (props: {
  item: IMovie;
  isFirst: boolean;
  isLast: boolean;
  isFav: boolean;
  width?: number;
}) => {
  const translateWidth = props.width ? props.width : 180;
  return (
    <View
      style={{
        width: translateWidth,
        marginVertical: 8,
        marginStart: props.isFirst ? 0 : SizeConstants.paddingRegular,
        marginEnd: props.isLast ? 0 : SizeConstants.paddingRegular,
      }}>
      {props.item.poster_path == undefined ? (
        <View style={{width:translateWidth, height:252, backgroundColor:'white',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
          <Icon
            name="alert-circle-outline"
            size={30}
            color={ColorConstants.black300}
          />
        </View>
      ) : (
        <Image
          resizeMode="cover"
          style={{
            borderRadius: 10,
            flex: 1,
            width: translateWidth,
            height: 252,
          }}
          src={`${APIConstants.IMAGE_URL_SMALL}${props.item.poster_path}`}
        />
      )}
      {/* <Image
        resizeMode="cover"
        style={{borderRadius: 10, flex: 1, width: translateWidth, height: 252}}
        src={`${APIConstants.IMAGE_URL_SMALL}${props.item.poster_path}`}
      /> */}
      {props.isFav && (
        <Text
          style={{
            position: 'absolute',
            top: SizeConstants.paddingRegular,
            start: SizeConstants.paddingRegular,
          }}>
          👍
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
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

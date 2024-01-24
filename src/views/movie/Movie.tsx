import {addFav, removeFav} from '../../store/userStore';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button, Pressable, Image} from 'react-native';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {
  FontConstants,
  ColorConstants,
  SizeConstants,
} from '../../constants/Constants';
import ScrollContainer from '../../containers/ScrollContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {useDispatch, useSelector} from 'react-redux';

import {useAppSelector} from '../../hooks';
import {RootState} from '../../store/rootStore';
import {APIConstants} from '../../constants/APIConstants';
import {getDateProps} from '../../util/parsers';

type MovieProps = NativeStackScreenProps<MainStackParamList, 'Movie'>;

const Movie = (props: MovieProps) => {
  const _movie: IMovie | undefined = props.route.params.movie;
  console.log('movie:', props.route.params.movie);
  const {favs} = useAppSelector(state => state.user);
  const {year} = getDateProps(_movie?.release_date);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <ScrollContainer>
        {props.route.params?.movie ? (
          <View style={{flex: 1}}>
            {props.route.params.movie.backdrop_path ? (
              <Image
                style={{height: 200}}
                src={`${APIConstants.IMAGE_URL_REGULAR}${_movie?.backdrop_path}`}
              />
            ) : (props.route.params.movie.poster_path ? (
              <Image
                style={{height: 200}}
                resizeMode='contain'
                src={`${APIConstants.IMAGE_URL_REGULAR}${_movie?.poster_path}`}
              />
            ):null)}

            <Text style={styles.title}>{_movie?.title}</Text>
            <Text style={styles.subtitle}>{year}</Text>
            <Text style={styles.overview}>
              {props.route.params.movie.overview}
            </Text>
          </View>
        ) : (
          <Text>undefined!</Text>
        )}
      </ScrollContainer>
      {_movie &&
        (favs[_movie.id] === undefined ? (
          <Pressable
            onPress={() => dispatch(addFav(_movie))}
            style={[
              styles.editFavorite,
              {backgroundColor: ColorConstants.green30},
            ]}>
            <View>
              <Text style={styles.editFavoriteText}>👍 Add to favorite!</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => dispatch(removeFav(_movie.id))}
            style={[
              styles.editFavorite,
              {backgroundColor: ColorConstants.warning30},
            ]}>
            <View>
              <Text style={[styles.editFavoriteText, {}]}>
                👎 Remove from favorite!
              </Text>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontConstants.sizeTitle,
    fontWeight: FontConstants.weightBold,
    marginVertical: SizeConstants.paddingRegular,
  },
  subtitle: {
    fontSize: FontConstants.sizeRegular,
    fontWeight: FontConstants.weightSemiBold,
    marginVertical: SizeConstants.paddingRegular,
  },
  overview: {
    fontSize: FontConstants.sizeRegular,
    color: ColorConstants.font,
    marginVertical: SizeConstants.paddingRegular,
  },
  editFavorite: {
    // flex: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 8,
    borderRadius: SizeConstants.borderRadius,
  },
  editFavoriteText: {
    fontSize: FontConstants.sizeRegular,
  },
});

export default Movie;

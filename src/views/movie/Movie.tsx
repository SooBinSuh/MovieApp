import {addFav, removeFav} from '../../store/userStore';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import {IMovie} from '../../@types/IMovie';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {FontConstants, ColorConstants} from '../../constants/Constants';
import ScrollContainer from '../../containers/ScrollContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {useDispatch, useSelector} from 'react-redux';

import { useAppSelector} from '../../hooks';
import { RootState } from '../../store/rootStore';

type MovieProps = NativeStackScreenProps<MainStackParamList, 'Movie'>;

const Movie = (props: MovieProps) => {
  const _movie: IMovie | undefined = props.route.params.movie;
  
  const {favs} = useAppSelector(state => state.user);
  
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <ScrollContainer>
        {props.route.params?.movie ? (
          <View>
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
            style={styles.editFavorite}>
            <View>
              <Text>👍 Add to favs</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => dispatch(removeFav(_movie.id))}
            style={styles.editFavorite}>
            <View>
              <Text>👎 Remove from favs</Text>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    fontSize: FontConstants.sizeRegular,
    color: ColorConstants.font,
  },
  editFavorite: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
  },
});

export default Movie;

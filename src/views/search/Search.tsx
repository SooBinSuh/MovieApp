import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {
  ActivityIndicator,
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {
  useGetMovieByTitlePagedQuery,
  useGetMovieByTitleQuery,
} from '../../services/movieService';
import ScrollContainer from '../../containers/ScrollContainer';
import {MovieItem} from '../home/Home';
import {SizeConstants} from '../../constants/Constants';
import {IMovie} from '../../@types/IMovie';

type SearchProps = NativeStackScreenProps<MainStackParamList, 'Search'>;

const Search = (props: SearchProps) => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const flatlistRef = useRef<FlatList>(null);

  const {data, error, isLoading} = useGetMovieByTitlePagedQuery({
    keyword: text,
    page: page,
  });


  const onMoviePress = (movie: IMovie) => {
    props.navigation.navigate('Movie', {movie: movie});
  };
  useEffect(() => {
    console.log('page changed,', page);
  }, [page]);

  const fetchMoreData = () => {
    if (data === undefined) {
      return;
    }
    if (data.page > data.total_pages) {
      return;
    }
    console.log('end reached! will fetch more');
    setPage(page + 1);
  };
  const onChangeText = (_text: string) => {
    console.log('onchangetext customFunc text: ', _text);
    flatlistRef.current?.scrollToOffset({offset: 0, animated: false});
    if (_text.length < text.length) {
      setPage(1);
    }
    setText(_text);
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={styles.textInput}
        autoCorrect={false}
      />
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          ref={flatlistRef}
          data={data?.results}
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          renderItem={({item, index}) => (
            <Pressable onPress={() => onMoviePress(item)}>
              <MovieItem
                item={item}
                isFirst={true}
                isLast={true}
                isFav={false}
                width={
                  SizeConstants.screenWidth / 2 -
                  SizeConstants.paddingRegular * 2
                }
              />
            </Pressable>
          )}
          keyExtractor={item => `${item.id}`}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linen',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 8,
  },
});
export default Search;

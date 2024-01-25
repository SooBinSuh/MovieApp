import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../@types/Stacks';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useGetMovieByTitleQuery} from '../../services/movieService';
import ScrollContainer from '../../containers/ScrollContainer';
import {MovieItem} from '../home/Home';
import {SizeConstants} from '../../constants/Constants';
import { IMovie } from '../../@types/IMovie';

type SearchProps = NativeStackScreenProps<MainStackParamList, 'Search'>;

const Search = (props: SearchProps) => {
  const [text, setText] = useState('');

  const {data, error, isLoading} = useGetMovieByTitleQuery(text);
  const onMoviePress = (movie: IMovie) => {
    props.navigation.navigate('Movie', {movie: movie});
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 8,
          margin: 8,
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
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
});
export default Search;

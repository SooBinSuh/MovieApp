import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet, Button} from 'react-native';
import {IGenre} from '../../@types/IGenre';
import {getGenres} from '../../services/movieService';
import ScrollContainer from '../../containers/ScrollContainer';
import Header from '../../components/Header';
import {
  ColorConstants,
  FontConstants,
  SizeConstants,
} from '../../constants/Constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../@types/Stacks';


type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home = (props: HomeProps) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  const onButtonPress = async()=>{
    console.log('press me!');
    setGenres(await getGenres());
  }
  useEffect(() => {
    console.log('get genres');

    // setGenres(getGenres());
  }, []);

  return (
    <ScrollContainer>
      <Header text="Movie Genres" />
      <Button title='test me' onPress={onButtonPress}/>
      {genres.map(genre => {
        return (
          <Pressable key={genre.id} onPress={() => props.navigation.navigate('Genre',{genre:genre})}>
            <Text style={styles.genreTitle}>{genre.name}</Text>
          </Pressable>
        );
      })}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  genreTitle: {
    fontSize: FontConstants.sizeRegular,
    marginBottom: SizeConstants.paddingSmall,
    padding: SizeConstants.paddingLarge,
    backgroundColor: ColorConstants.backgroundLight,
    color: ColorConstants.font,
  },
});

export default Home;

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
import { NavigationContainer } from '@react-navigation/native';


type HomeProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home = (props:HomeProps) => {
  
  const [genres, setGenres] = useState<IGenre[]>([]);
  console.log('genres:',genres);
  useEffect(()=>{
    console.log('HOME navigation:',props.navigation.isFocused());
  },[props.navigation])
  useEffect(() => {
    console.log('get genres');
    const fetchGenres = async ()=>{
      setGenres(await getGenres());
    }
    fetchGenres(); 
    
  }, []);
  const onGenrePress = (genre:IGenre)=>{
    console.log('ongenrepress');
    props.navigation.navigate('Genre',{genre:genre});
  }
  return (
    <ScrollContainer>
      {/* <Button title='test me' onPress={onButtonPress}/> */}
      {genres.map(genre => {
        return (
          <Pressable key={genre.id} onPress={() => onGenrePress(genre)}>
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

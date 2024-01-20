import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  ColorConstants,
  FontConstants,
  SizeConstants,
} from '../../constants/Constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserStackParamList} from '../../@types/Stacks';
import {useAppSelector} from '../../hooks';
import ScrollContainer from '../../containers/ScrollContainer';
import { IMovie } from '../../@types/IMovie';

type UserProps = NativeStackScreenProps<UserStackParamList, 'User'>;

const User = (props: UserProps) => {
  const user = useAppSelector(state => state.user);

  const onMoviePress = (movie:IMovie)=>{
    props.navigation.navigate('Movie',{movie:movie});
  }
  return (
    <View style={styles.userScreenContainer}>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholder}>
          Hello, {user.name} this is your favs
        </Text>
      </View>
      <ScrollContainer>
        {Object.values(user.favs).map(movie => {
          return (
            <Pressable key={movie.id} onPress={()=>onMoviePress(movie)}>
              <Text>{movie.title}</Text>
            </Pressable>
          );
        })}
      </ScrollContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  userScreenContainer: {
    flex: 1,
    padding: SizeConstants.paddingLarge,
  },
  placeholderContainer: {
    backgroundColor: ColorConstants.background,
    marginVertical: 20,
  },
  placeholder: {
    fontSize: FontConstants.sizeTitle,
    fontWeight: FontConstants.weightBold,
    color: ColorConstants.font,
  },
});
export default User;

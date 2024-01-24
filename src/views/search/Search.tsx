import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../@types/Stacks";
import { StyleSheet, Text, View } from "react-native";

type SearchProps = NativeStackScreenProps<MainStackParamList,'Search'>;

const Search = (props:SearchProps)=>{

    return (
        <View style={styles.container}>
            <Text>SearchView</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
export default Search
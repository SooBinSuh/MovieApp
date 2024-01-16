import { StyleSheet, Text, View } from "react-native"
import { ColorConstants, FontConstants, SizeConstants } from "../../constants/Constants"
import { useUserStore } from "../../store/userStore"

const User = () => {
    const name = useUserStore(state => state.name);

    return (
        <View style={styles.placeholderContainer}>
            <Text style={styles.placeholder}>We will create user here</Text>
            <Text>name is {name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    placeholderContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: ColorConstants.background,
    },
    placeholder:{
        fontSize:FontConstants.sizeRegular,
        marginBottom: SizeConstants.paddingSmall,
        padding: SizeConstants.paddingLarge,
        color: ColorConstants.font,
    }
})
export default User;
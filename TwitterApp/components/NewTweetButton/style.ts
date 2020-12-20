import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.tint,
        position: "absolute",
        bottom: 20,
        right: 20,
        borderRadius: 50,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default styles
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tweetHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    tweetHeaderNames: {
        flexDirection: 'row'
    },
    name: {
        marginHorizontal: 5,
        fontWeight: "bold"
    },
    username: {
        marginHorizontal: 5,
        color: 'gray'
    },
    createdAt: {
        marginHorizontal: 5,
        color: 'gray'
    },
    moreIcon: {
       
    }
})

export default styles
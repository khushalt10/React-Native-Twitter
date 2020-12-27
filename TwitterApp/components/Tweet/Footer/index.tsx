import { AntDesign, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createLike, deleteLike } from '../../../graphql/mutations';
import { TweetType } from '../../../types';
import styles from './styles';

export type FooterProps= {
    tweet: TweetType
}


const Footer = ({ tweet }: FooterProps) => {
    
    const [user, setUser] = React.useState(null)
    const [mylike, setMylike] = React.useState(null)
    const [likesCount, setLikesCount] = React.useState(tweet.likes.items.length)

    React.useEffect(() => {
        const fetchUser = async () => {
            const cuser = await Auth.currentAuthenticatedUser()
            setUser(cuser)

            const searchedLike = await tweet.likes.items.find((like) => like.userID === cuser.attributes.sub)
            setMylike(searchedLike)
        }
        fetchUser()
    },[])

    const submitLike = async () => {

        const like = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }
        try {
            const res = await API.graphql(graphqlOperation(createLike, { input: like }))
            setMylike(res.data.createLike)
            setLikesCount(likesCount + 1)
        } catch (error) {
            console.log(error)
        }
    }

    const removeLike = async () => {
        try {
            await API.graphql(graphqlOperation(deleteLike, { input: { id: mylike.id }}))
            setLikesCount(likesCount - 1)
            setMylike(null)
        } catch (error) {
            console.log(error)
        }
    }

    const onLike = async () => {
        if (!user) {
            return;
        }

        if (!mylike) {
            await submitLike()
        }else {
            await removeLike()
        }
    }
  
    return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Feather name={"message-circle"} size={20} color={"gray"} />
            <Text style={styles.number}>{tweet.numberOfComments}</Text>
        </View>
        <View style={styles.iconContainer}>
            <EvilIcons name={"retweet"} size={30} color={"gray"} />
            <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
        </View>
        <TouchableOpacity onPress={onLike}>
        <View style={styles.iconContainer}>
            <AntDesign name={!mylike ? "hearto" : "heart"} size={20} color={!mylike ? "gray" : "red"} />
            <Text style={styles.number}>{likesCount}</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
            <EvilIcons name={"share-google"} size={25} color={"gray"} />
        </View>
    </View>
)}

export default Footer
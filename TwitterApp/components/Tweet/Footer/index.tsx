import { AntDesign, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { TweetType } from '../../../types';
import styles from './styles';


export type FooterProps= {
    tweet: TweetType
}

const Footer = ({ tweet }: FooterProps) => (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Feather name={"message-circle"} size={20} color={"gray"} />
            <Text style={styles.number}>{tweet.numberOfComments}</Text>
        </View>
        <View style={styles.iconContainer}>
            <EvilIcons name={"retweet"} size={30} color={"gray"} />
            <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
        </View>
        <View style={styles.iconContainer}>
            <AntDesign name={"hearto"} size={20} color={"gray"} />
            <Text style={styles.number}>{tweet.numberOfLikes}</Text>
        </View>
        <View style={styles.iconContainer}>
            <EvilIcons name={"share-google"} size={25} color={"gray"} />
        </View>
    </View>
)

export default Footer
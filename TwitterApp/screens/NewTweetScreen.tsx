import { EvilIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feed from '../components/Feed';
import NewTweetButton from '../components/NewTweetButton';
import ProfilePicture from '../components/ProfilePicture';

import { Text, View } from '../components/Themed';
import Tweet from '../components/Tweet';
import Colors from '../constants/Colors';
import tweets from '../data/tweets';

export default function NewTweetScreen() {
  const [tweet, setTweet] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  
    const onPostTweet = () => {
        console.log("tweet ", tweet)
        console.log("Image ", imageUrl)
    }


  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
          <EvilIcons name="close" size={30} color={Colors.light.tint} />
          <TouchableOpacity style={styles.button} onPress={onPostTweet} >
              <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture image={'https://avatars0.githubusercontent.com/u/62281618?s=460&u=4f420b0715e5446afeeb70f29047d25c0575ca30&v=4'} />
        <View style={styles.inputContainer}>
        <TextInput value={tweet} onChangeText={(value) => setTweet(value)} multiline numberOfLines={3} placeholder={"What's happening?"} style={styles.tweetInput} />
        <TextInput value={imageUrl} onChangeText={(value) => setImageUrl(value)} placeholder={"Image url (optional)"} style={styles.imageInput} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 15
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,
    marginTop: 20
  },
  inputContainer: {
    marginLeft: 10,
    marginTop: -35
  },
  tweetInput: {
    maxHeight: 300,
    height: 100,
    fontSize: 20
  },
  imageInput: {
    fontSize: 15
  }
});

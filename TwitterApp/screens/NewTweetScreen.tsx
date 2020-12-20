import { EvilIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feed from '../components/Feed';
import NewTweetButton from '../components/NewTweetButton';

import { Text, View } from '../components/Themed';
import Tweet from '../components/Tweet';
import Colors from '../constants/Colors';
import tweets from '../data/tweets';

export default function NewTweetScreen() {
    const onPostTweet = () => {
        console.warn("On post tweet")
    }

  return (
    <View style={styles.container}>
      <View>
          <EvilIcons name="close" size={30} color={Colors.light.tint} />
          <TouchableOpacity style={styles.button} onPress={onPostTweet} >
              <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});

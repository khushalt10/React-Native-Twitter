import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import * as React from 'react';
import { Image, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feed from '../components/Feed';
import NewTweetButton from '../components/NewTweetButton';
import ProfilePicture from '../components/ProfilePicture';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { Text, View } from '../components/Themed';
import Tweet from '../components/Tweet';
import Colors from '../constants/Colors';
import tweets from '../data/tweets';
import { createTweet } from '../graphql/mutations';

export default function NewTweetScreen() {
  const [tweet, setTweet] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  
  const navigation = useNavigation()

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };
  
      const uploadImage = async () => {
        try {
          const response = await fetch(imageUrl)
  
          const blob = await response.blob()
          const urlParts = imageUrl.split('.')
          const extension = urlParts[urlParts.length - 1];
          const key = `${Math.floor((Math.random() * 100) + 1)*Math.floor((Math.random() * 100) + 1)*Math.floor((Math.random() * 100) + 1)}.${extension}`
          await Storage.put(key, blob)
          return key;
        } catch (error) {
          console.log(error)
        }
        return ''
      }

    const onPostTweet = async () => {
      let image;
      if (!!imageUrl) {
        image = await uploadImage()
      }
        try {
          const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true })

          const newTweet = {
            content: tweet,
            image,
            userID: currentUser.attributes.sub
          }
          await API.graphql(graphqlOperation(createTweet, { input: newTweet }))
          navigation.goBack()
        } catch (error) {
          console.log(error)
        }
    }


  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPostTweet} >
              <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture image={'https://avatars0.githubusercontent.com/u/62281618?s=460&u=4f420b0715e5446afeeb70f29047d25c0575ca30&v=4'} />
        <View style={styles.inputContainer}>
        <TextInput value={tweet} onChangeText={(value) => setTweet(value)} multiline numberOfLines={3} placeholder={"What's happening?"} style={styles.tweetInput} />
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.imagePick}>Pick an image</Text>
        </TouchableOpacity>
        <Image source={{ uri: imageUrl }} style={styles.image} />
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
  },
  imagePick: {
    color: Colors.light.tint,
    fontSize: 18,
    marginVertical: 10
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15
  }
});

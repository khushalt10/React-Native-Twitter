import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';

Amplify.configure(config)
//https://expo.io/@khushalt10/TwitterApp
function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  const getRandomImage = () => {
    return 'data:image/jpeg;base64,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'
  }
  
  const saveUserToDB = async (user) => {
    console.log(user)
    await API.graphql(graphqlOperation(createUser, { input: user }))    
  }

  useEffect(() => {
    const updateUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })
      
      if(userInfo) {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub}))
        if(!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          }
          await saveUserToDB(user)
        } else {
          console.log("user already exists")
        }
      }
    }
    updateUser()
  },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);

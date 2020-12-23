import { API, graphqlOperation } from 'aws-amplify';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { listTweets } from '../../graphql/queries';
import Tweet from '../Tweet';

const Feed = () => {
    
    const [tweets, setTweets] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const fetchTweets = async() => {
        setLoading(true)
        try {
            const tweetsData = await API.graphql(graphqlOperation(listTweets))
            setTweets(tweetsData.data.listTweets.items)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        fetchTweets()
    },[])
    
    return(
        <View style={{ width: '100%'}}>
            <FlatList
                data={tweets}
                renderItem={({item}) => <Tweet tweet={item} />}
                keyExtractor={(item) => item.id}
                refreshing={loading}
                onRefresh={fetchTweets}
            /> 
        </View>
    )}

export default Feed
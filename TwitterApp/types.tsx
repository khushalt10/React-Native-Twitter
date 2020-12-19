export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type UserType = {
  id: string,
  name: string,
  username: string,
  image?: string
}

export type TweetType = {
  id: string,
  user: UserType,
  createdAt: string,
  content: string,
  image?: string,
  numberOfComments?: number,
  numberOfRetweets?: number,
  numberOfLikes?: number
}

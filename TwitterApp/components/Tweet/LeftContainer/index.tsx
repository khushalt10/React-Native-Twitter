import * as React from 'react';
import { View } from 'react-native';
import { UserType } from '../../../types';
import ProfilePicture from '../../ProfilePicture';

export type LeftContainerProps= {
    user: UserType
}

const LeftContainer = ({ user }: LeftContainerProps) => (
    <View>
        <ProfilePicture image={user.image} size={70} />
    </View>
)

export default LeftContainer
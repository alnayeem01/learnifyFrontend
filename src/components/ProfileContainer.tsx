import { FC } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { UserProfile } from '../store/auth';
import AvatarField from './ui/AvatarField';
import colors from '../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    profile?: UserProfile | null,

}
const ProfileContainer: FC<Props> = ({ profile }) => {
    if (!profile) return null;

    return (
        <View style={styles.container}>
            <AvatarField source={profile.avatar} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{profile.name}</Text>
                <View style={styles.flexRow}>
                    <Text style={styles.email}>{profile.email}</Text>
                    <MaterialIcons 
                        name='verified'
                         size={15} 
                        color={colors.SECONDARY} 
                    />
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.profileActionLink}>{profile.followers} Followers</Text>
                    <Text style={styles.profileActionLink}>{profile.following} Followings</Text>
                </View>
            </View>

            <Pressable style={styles.settingContainer}>
                <AntDesign name='setting' size={20} color={colors.CONTRAST} />
            </Pressable>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    infoContainer:{
        marginLeft: 7
    },
    title: {
        color: colors.CONTRAST,
        fontSize: 18,
        fontWeight: 'bold'
    },
    email: {
        color: colors.CONTRAST,
        fontSize: 14,
        marginRight: 5
    },
    flexRow:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileActionLink:{
        backgroundColor: colors.SECONDARY,
        color: colors.PRIMARY,
        paddingHorizontal: 4,
        paddingVertical: 2,
        margin: 5
    },
    settingContainer:{
        width: 40,
        height: 40,
        alignItems: 'flex-end'
    }
   

});

export default ProfileContainer;
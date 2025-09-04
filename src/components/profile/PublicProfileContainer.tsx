import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AvatarField from '../ui/AvatarField';
import colors from '../../utils/colors';


interface Props {
    profile?: PublicProfile | null,
}
const PublicProfileContainer: FC<Props> = ({ profile }) => {
    if (!profile) return null;
    // As this is a nested navigation follow this type declaration standard 
    return (
        <View style={styles.container}>
            <AvatarField source={profile.avatar} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{profile.name}</Text>
                <View style={styles.flexRow}>
                    <Text style={styles.profileActionLink}>{profile.followers} Followers</Text>
                    <Text style={styles.profileActionLink}>{profile.following} Followings</Text>
                </View>
            </View>
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
    infoContainer: {
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
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileActionLink: {
        backgroundColor: colors.SECONDARY,
        color: colors.PRIMARY,
        paddingHorizontal: 4,
        paddingVertical: 2,
        margin: 5
    },
    settingContainer: {
        width: 40,
        height: 40,
        alignItems: 'flex-end'
    }
});

export default PublicProfileContainer;
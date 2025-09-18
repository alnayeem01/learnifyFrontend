import { FC } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import AvatarField from '../ui/AvatarField';
import colors from '../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFetchIsFollowing } from '../../hooks/query';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../../store/player';
import { getAuthState } from '../../store/auth';
import { getClient } from '../../api/client';
import { useQueryClient } from '@tanstack/react-query';


interface Props {
    profile?: PublicProfile | null,
}
const PublicProfileContainer: FC<Props> = ({ profile }) => {
    if (!profile) return null;
    console.log(profile)
    // As this is a nested navigation follow this type declaration standard 
    const { data } = useFetchIsFollowing(profile.id || '')
    const useQuery = useQueryClient()
    const handleFollowToggle = async ()=>{
        try{
            const client = await getClient();
            const res = await client.post('/profile/update-follower/'+profile.id)
            console.log(res.status)
            useQuery.invalidateQueries({ queryKey: ['is-following', profile.id] })
            useQuery.invalidateQueries({ queryKey: ['public-Profile', profile.id] })

        }catch(e){
            console.log(e)
        }
    }
    return (
        <View style={styles.container}>
            <AvatarField source={profile.avatar} />
            <View style={styles.infoContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{profile.name}</Text>
                    <View style={styles.button}>
                        {data ?
                            <Pressable onPress={handleFollowToggle} style={styles.flexRow}>
                                <Text style={styles.text}>unfollow</Text>
                                <AntDesign name={'meh'} color={colors.SECONDARY} size={18} />
                            </Pressable> :
                            <Pressable onPress={handleFollowToggle} style={styles.flexRow}>
                                <Text style={styles.text}>Follow</Text>
                                <AntDesign name={'check'} color={colors.SECONDARY} size={18} />
                            </Pressable>
                        }
                    </View>
                </View>
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
        alignItems: 'center'
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
        alignItems: 'center',
        gap: 5
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
    },
    button: {
        backgroundColor: colors.OVERLAY, // blue
        paddingVertical: 5,
        width: 100,
        borderRadius: 50,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    },
});

export default PublicProfileContainer;
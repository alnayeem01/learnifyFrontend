import { FC } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import AppView from '../AppView';
import { useFetchPublicPlaylist } from '../../hooks/query';
import PlayListItem from '../ui/PlayListItem';
import { PlayList } from '../../@types/audio';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { PublicProfileTabParamList } from '../../@types/navigation';
import EmptyRecords from '../ui/EmptyRecords';


type Props = MaterialTopTabScreenProps<PublicProfileTabParamList, 'PublicPlaylist'>

const PublicPlayListTab: FC<Props> = props => {
    const id = props.route.params.ProfileId;
    const { data } = useFetchPublicPlaylist(id)
    console.log('data from playlist', data)

    return <AppView>
        <ScrollView style={styles.container}>
            {!data ? <EmptyRecords title='No Playlist found!' /> : null}
            {data?.map((playlist: PlayList) => {
                return (
                    <PlayListItem key={playlist.id} playlist={playlist} />
                )
            })}
        </ScrollView>
    </AppView>
};

const styles = StyleSheet.create({
    container: {}
});

export default PublicPlayListTab;
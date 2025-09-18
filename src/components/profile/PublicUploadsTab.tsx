import { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import AppView from '../AppView';
import { useFetchPublicUploads } from '../../hooks/query';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';
import AudioListItem from '../ui/AudioListItem';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../../store/player';
import useAudioController from '../../hooks/useAudioController';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { PublicProfileTabParamList } from '../../@types/navigation';


type Props = MaterialTopTabScreenProps<PublicProfileTabParamList, 'PublicUploads'>

const PublicUploadsTab: FC<Props> = props => {
    const id = props.route.params.ProfileId
    console.log('if from child',id)
    const { data, isLoading } = useFetchPublicUploads(id);
    console.log('data from uploads',data)
    const {onGoingAudio} = useSelector(getPlayerState);
    const {onAudioPress}  = useAudioController();
    //Loading ui for auiolistItem
    if (isLoading)
        return <AudioListLoadingUi items={15} />
    // //if there is no data insdie we will show this in UI
    if (!data?.length)
        return <EmptyRecords title="There is no audio's." />
    //passing the audio to our component AudioListItem component
    return (
        <AppView>
            <ScrollView style={styles.container}>
                {data?.map((item) => {
                    return (
                        <AudioListItem
                            isPlaying={item.id === onGoingAudio?.id}
                            onPress={() => onAudioPress(item, data)}
                            key={item.id}
                            audio={item}
                        />
                    )
                })}
            </ScrollView>
        </AppView>
)};

const styles = StyleSheet.create({
    container: {
    padding: 10,
    paddingBottom: 480,
    }
});

export default PublicUploadsTab;
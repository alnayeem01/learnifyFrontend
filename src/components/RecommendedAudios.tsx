import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useFetchRecommendedAudios } from '../hooks/query';
import colors from '../utils/colors';
import GridView from './ui/GridView';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import AudioCard from './ui/AudioCard';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../store/player';


interface Props {
    onAudioPress(item: any, data: any): void;
    onAudioLongPress(item: any, data: any): void
}

const dummyData = new Array(6).fill("")

const RecommendedAudios: FC<Props> = ({ onAudioPress, onAudioLongPress }) => {
    const { data, isLoading } = useFetchRecommendedAudios()
    const { onGoingAudio } = useSelector(getPlayerState)
    if (isLoading)
        return (
            <PulseAnimationContainer>
                <View style={styles.container}>
                    <View style={styles.dummyTitleView} />
                    <GridView
                        col={3}
                        data={dummyData}
                        renderItem={() => {
                            return (
                                <View>
                                    <View style={{ width: '100%', aspectRatio: 1, backgroundColor: colors.INACTIVE_CONTRAST }} />
                                    <View style={{ width: '80%', height: 10, marginTop: 10, backgroundColor: colors.INACTIVE_CONTRAST }} />
                                </View>
                            )
                        }} />
                </View>
            </PulseAnimationContainer>
        )

    if (!data?.length) {
        return null
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Recommended</Text>
        <GridView
            col={3}
            data={(data || []).slice(0, 6)}
            renderItem={(item) => {
                return (
                    <AudioCard
                        title={item.title}
                        poster={item.poster?.url}
                        onLongPress={() => onAudioLongPress(item, data)}
                        onPress={() => onAudioPress(item, data)}
                        playing={onGoingAudio?.id === item.id}
                    />
                )
            }} />
    </View>

};

const styles = StyleSheet.create({
    container: {
        padding: 5,

    },
    title: {
        color: colors.CONTRAST, padding: 5, fontSize: 20, fontWeight: 'bold', marginBottom: 15

    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        resizeMode: 'cover',
        height: 100
    },
    dummyTitleView: {
        height: 20,
        width: 150,
        backgroundColor: colors.INACTIVE_CONTRAST,
        marginBottom: 15,
        borderRadius: 5
    },
    dummyAudiosView: {
        height: 100,
        width: 100,
        backgroundColor: colors.INACTIVE_CONTRAST,
        marginRight: 15,
        borderRadius: 5
    },
});

export default RecommendedAudios;
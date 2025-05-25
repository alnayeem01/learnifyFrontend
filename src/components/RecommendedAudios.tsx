import React, { FC } from 'react'
import { View, StyleSheet, Text, Image, Pressable } from 'react-native'
import { useFetchRecommendedAudios } from '../../hooks/query';
import colors from '../utils/colors';
import GridView from './ui/GridView';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import { AudioData } from '../@types/audio';


interface Props {
    onAudioPress(item: any, data: any): void;
    onAudioLongPress(item: any, data: any): void
}

const dummyData = new Array(6).fill("")

const RecommendedAudios: FC<Props> = ({ onAudioPress, onAudioLongPress }) => {
    const { data, isLoading } = useFetchRecommendedAudios()

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


    return <View style={styles.container}>
        <Text style={styles.title}>Recommended</Text>
        <GridView
            col={3}
            data={(data || []).slice(0, 6)}
            renderItem={(item) => {
                return (
                    <Pressable
                        onLongPress={() => onAudioLongPress(item, data)}
                        onPress={() => onAudioPress(item, data)}
                        style={{ padding: 10 }}>
                        <Image
                            source={item.poster ? { uri: item.poster } : require('../../assets/images/music.jpg')}
                            style={styles.image}
                        />
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={2}
                            style={styles.title}
                        >
                            {item?.title}
                        </Text>
                    </Pressable>
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
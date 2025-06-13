import { FC } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, Pressable } from 'react-native'
import { useFetchLatestAudios } from '../../hooks/query';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';
import AudioCard from './ui/AudioCard';
import { AudioData } from '../@types/audio';



interface Props {
    onAudioPress(item: AudioData, data: AudioData[]) : void
    onAudioLongPress(item: AudioData, data: AudioData[]) : void
}

const dummyData = new Array(4).fill("")

const LatestUploads: FC<Props> = ({onAudioPress, onAudioLongPress}) => {

    const { data, isLoading } = useFetchLatestAudios();

    if(isLoading)
    return (
        <PulseAnimationContainer>
            <View style={styles.container}>
                <View style={styles.dummyTitleView} />
                <View style={{flexDirection: 'row'}}>
                    {dummyData.map((_, index) => {
                        return (
                            <View key={index} style={styles.dummyAudiosView} />
                        )
                    })}
                </View>
            </View>
        </PulseAnimationContainer>
    )


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Latest Uploads</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.map((item) => {
                    return (
                        <AudioCard 
                            onPress={()=>onAudioPress(item, data)}
                            onLongPress={()=>onAudioLongPress (item, data)}
                            key={item.id} 
                            title={item.title} 
                            poster={item.poster?.url} 
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
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
    title:{
    color: colors.CONTRAST, padding: 5, fontSize: 20, fontWeight: 'bold', marginBottom: 10 
    }
});

export default LatestUploads;
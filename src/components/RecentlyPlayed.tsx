import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useFetchRecentlyPlayed } from '../../hooks/query';
import colors from '../utils/colors';
import RecentlyPlayedCard from './RecentlyPlayedCard';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';


interface Props {

}
const RecentlyPlayed: FC<Props> = props => {
    const dumyData = new Array(6).fill(null)
    const { data, isLoading } = useFetchRecentlyPlayed()
    if (isLoading) {
        return (
            <PulseAnimationContainer>
                  <Text style={styles.title}>Recently Played</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {dumyData.map((item, index) => {
                        return (
                            <View key={index} style={styles.dummyContainer} />
                        )
                    })}
                </View>
            </PulseAnimationContainer>

        )
    };

    if(!data?.length) return null

    return <View style={{ flex: 1 }} >
        <Text style={styles.title}>Recently Played</Text>
        <View style={styles.container}>
            {
                data?.map((item) => {
                    return (
                        <RecentlyPlayedCard key={item.id} title={item.title} poster={item.poster} onPress={() => { }} />
                    )
                })
            }
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 10,

    },
    title: {
        color: colors.CONTRAST, padding: 5, fontSize: 20, fontWeight: 'bold', marginBottom: 15

    },
    dummyContainer: {
        backgroundColor: colors.OVERLAY,
        width: '45%',
        margin: 5,
        padding: 20
    }
});

export default RecentlyPlayed;
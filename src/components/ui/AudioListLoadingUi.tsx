import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import PulseAnimationContainer from '../../ui/PulseAnimationContainer';
import colors from '../../utils/colors';


interface Props{
    items?:number
}
const AudioListLoadingUi:FC<Props> = ({items = 8}) => {
    const dummyData = new Array(items).fill(null);
  return(
   <PulseAnimationContainer>
        <View>
            {dummyData.map((_,index)=>{
                return(
                    <View key={index} style={styles.dummyListItem}> </View>
                )
            })}
        </View>
   </PulseAnimationContainer>
   )
};

const styles = StyleSheet.create({
    dummyListItem: {
        height: 50,
        width: '100%',
        backgroundColor : colors.INACTIVE_CONTRAST,
        borderRadius: 5,
        marginBottom: 15
    }
});

export default AudioListLoadingUi;
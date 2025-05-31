import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AppLink from '../ui/AppLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../utils/colors';
import client, { getClient } from '../api/client';
import { useSelector } from 'react-redux';
import { getAuthState } from '../store/auth';
import { ProfileNavigatorStackParamList } from '../@types/navigation';



interface Props {
    time?: number,
    ativeAtFirst?: boolean,
    linkTitle: string,
    userId?: string
};

const ReVerification: FC<Props> = ({ time = 60, userId, ativeAtFirst = false, linkTitle }) => {
    const navigation = useNavigation<NavigationProp<ProfileNavigatorStackParamList>>()
    const [countDown, setCountDown] = useState(time);
    const [canSendNewOtpReq, setCanSendNewOtpReq] = useState(ativeAtFirst)

    const { profile } = useSelector(getAuthState)
    //re-send OTP 
    const handleOtp = async () => {
        setCountDown(60)
        setCanSendNewOtpReq(false)
        try {
            const client = await getClient();
            await client.post('/auth/re-verify-email', {
                userId: userId || profile?.id
            })
            navigation.navigate('Verification', {userInfo:{
                email: profile?.email || "",
                id: profile?.id || "",
                name: userId || profile?.name || ""
            }});
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountDown((oldCountDown) => {
                if (oldCountDown <= 0) {
                    setCanSendNewOtpReq(true)
                    return 0
                }
                return oldCountDown - 1
            })
        }, 1000);
        return () => {
            clearInterval(intervalId)
        }
    }, [canSendNewOtpReq]);
    return (
        <View style={styles.container}>
            {countDown > 0 && !canSendNewOtpReq ?
                <Text style={styles.countDown}>{countDown} Sec</Text> :
                null}
            <AppLink active={canSendNewOtpReq} title={linkTitle} onPress={handleOtp} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    countDown: {
        color: colors.SECONDARY,
        marginRight: 7
    }
});

export default ReVerification;
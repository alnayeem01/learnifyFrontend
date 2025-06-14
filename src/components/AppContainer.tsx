import { FC, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Notification from '../views/Notification';

interface Props {
    children: ReactNode
}
const AppContainer: FC<Props> = ({ children }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Notification />
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AppContainer;
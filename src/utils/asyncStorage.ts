import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveToAsyncStorage = async (key: string, value: string)=>{
    await AsyncStorage.setItem(key, value)
};

export const getFromAsyncStorage = async (key: string)=>{
    return await AsyncStorage.getItem(key)
}

export const removeFromAsyncStorage = async (key: string)=>{
    return await AsyncStorage.removeItem(key)
}

export const clearAsyncStorage = async (key: string, value: string)=>{
    await AsyncStorage.clear()
};

export enum keys{
    Auth_TOKEN = "AUTH_TOKEN"
}
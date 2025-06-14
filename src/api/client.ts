import axios, { CreateAxiosDefaults } from "axios";
import { getFromAsyncStorage, keys } from "../utils/asyncStorage";

const client = axios.create({
    baseURL: 'http://10.0.2.2:5000'
})

const baseURL= 'http://10.0.2.2:5000'

type heders = CreateAxiosDefaults<any>['headers']

export const getClient = async (headers?: heders)=>{
    const token = await getFromAsyncStorage(keys.Auth_TOKEN);
    if(!token) return axios.create({baseURL});


    // passing Auhtorization token as default header and spreadin all other headers that we will accept form getClient Mehtod 
    const defaultHeaders = {
        Authorization: 'Bearer ' + token,
        ...headers
    };
    return axios.create({baseURL, headers: defaultHeaders})
}

export default client 
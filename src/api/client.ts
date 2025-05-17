import axios from "axios";

const client = axios.create({
    baseURL: 'http://10.0.2.2:5000'
})

export default client 
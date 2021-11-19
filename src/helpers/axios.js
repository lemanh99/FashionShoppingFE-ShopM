import axios from 'axios';
import store from '../redux/store';
import { api } from '../urlConfig';

const token = (typeof window !== "undefined") ? window.localStorage.getItem('token') : null;
console.log(api)

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

axiosIntance.interceptors.request.use((req) => {
    // const { auth } = store.getState();
    // if (auth.token) {
        // req.headers.Authorization = `Bearer ${auth.token}`;
    // }
    return req;
})

axiosIntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error.response);
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
        // localStorage.clear();
        // store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return error.response;
})

export default axiosIntance;
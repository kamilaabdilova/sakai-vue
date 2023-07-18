// заменить на свою
import axios from 'axios';
import store from '@/store';

const API_URL = store.state.API_URI;

async function registerUser(email, password, username, confirmPassword) {

    return axios.post(API_URL + '/registration', {
        email: email,
        password: password,
        username: username,
        confirmPassword: confirmPassword
    })
}


export default {
    registerUser
};

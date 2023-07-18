// заменить на свою
import axios from 'axios';
// import store from '@/store';

const API_URL = "http://localhost:8080";

async function registerUser(username, email, password, confirmPassword) {
    console.log('we are in service');
    const params = {
        email: email,
        password: password,
        username: username,
        confirmPassword: confirmPassword
    };
    console.log('params is: ', params);
    const response = await axios.post(API_URL + '/registration', params);
    console.log(response);
    return response;
}


export default {
    registerUser
};

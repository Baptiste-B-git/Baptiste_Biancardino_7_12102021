import Api from './api';

export default {
    signup(credentials) {
        return Api().post('api/user/register', credentials)
    },
    login (credentials) {
        return Api().post('api/user/login', credentials)
    },
}
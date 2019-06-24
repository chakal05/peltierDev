import axios from 'axios'

export default {
    getHours(day) {
        return axios.post('requests/loadHours', day);
    },

    submitForm(data) {
        return axios.post('requests/register', data);
    },

    loginUser(credentials) {
        return axios.post('requests/login', credentials);
    },

    getReser(dag) {
        return axios.post('requests/reservations', dag);
    }

}
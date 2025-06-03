const { default: axios } = require("axios");

const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/auth/login/', {
            username, password
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            if (error.response.status !== 401) {
                console.log(error);
            }
            reject(error);
        });
    });
}
const postRefresh = (refreshToken) => {
    return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            if (error.response.status !== 401) {
                console.log(error);
            }
            reject(error);
        });
    });
}
module.exports = {
    postLogin,
    postRefresh
}
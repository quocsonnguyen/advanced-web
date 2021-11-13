import axios from 'axios';

const API = "http://localhost:3300/api/";

class AuthService {
    login(email, password) {
        return axios.post(API + "signin", {
            email,
            password
        }).then(res => {
            if (res.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res.data;
        })
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API + "signup", {
            username,
            email,
            password
        })
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}
export default new AuthService();
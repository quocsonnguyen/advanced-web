import axios from 'axios';

class AuthService {
    login(email, password) {
        return axios.post("/api/signin", {
            email,
            password
        }).then(res => {
            if (res.data.accessToken) {
                localStorage.setItem("user", JSON.stringify({
                    id : res.data.id,
                    name: res.data.name,
                    image: res.data.image,
                    role: res.data.roles
                }));
                console.log(res.data);
                localStorage.setItem('uid', res.data.id)
            }
            return res.data;
        })
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, roles) {
        return axios.post("/api/signup", {
            username,
            email,
            password,
            roles
        })
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}
export default new AuthService();
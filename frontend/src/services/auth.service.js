import axios from 'axios';

class AuthService {
    login(username, password) {
        return axios.post("/api/signin", {
            username,
            password
        }).then(res => {
            if (res.data.accessToken) {
                localStorage.setItem("user", JSON.stringify({
                    id : res.data.id,
                    name: res.data.name,
                    image: res.data.image,
                    role: res.data.role
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
        return axios.post("/signup", {
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
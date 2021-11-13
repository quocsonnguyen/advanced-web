import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://localhost:3300/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  getFalcultyBoard() {
    return axios.get(API_URL + 'falculty', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
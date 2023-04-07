// services/auth.service.js
import axios from 'axios';

const API_URL = 'https://159.89.228.162:4000/api/users/';

class AuthService {
  async register(name, email, password) {
    const response = await axios.post(API_URL + 'register', {
      name,
      email,
      password,
    });
    return response.data;
  }

  async login(email, password) {
    const response = await axios.post(API_URL + 'login', {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;

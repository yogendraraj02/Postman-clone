// src/services/authService.ts
import axios from 'axios';
import { BASE_URL } from '../config';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  email: string;
  username: string,
  password: string,
}

const authService = {
  login: async (data: LoginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;
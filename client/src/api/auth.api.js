import axios from './axios.api';

export const registerRequest = async (user) => {
   return await axios.post(`/register`, user);
};

export const loginRequest = async (user) => {
   return await axios.post(`/login`, user);
};

export const verifyTokenRequest = async () => {
   return await axios.get(`/verify`);
};

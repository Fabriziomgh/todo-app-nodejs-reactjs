import { createContext, useEffect, useState } from 'react';
import {
   registerRequest,
   loginRequest,
   verifyTokenRequest,
} from '../api/auth.api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [users, setUsers] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [errors, setErrors] = useState([]);
   const [loading, setLoading] = useState(true);

   const signup = async (user) => {
      try {
         const response = await registerRequest(user);
         setUsers(response.data);
         setIsAuthenticated(true);
      } catch (error) {
         if (Array.isArray(error.response.data)) {
            console.log(error.response.data);
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
      }
   };
   const signin = async (user) => {
      try {
         const response = await loginRequest(user);
         setUsers(response.data);
         setIsAuthenticated(true);
      } catch (error) {
         if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
         }
         setErrors([error.response.data.message]);
      }
   };
   const logout = () => {
      Cookies.remove('token');
      setIsAuthenticated(false);
      setUsers(null);
   };
   useEffect(() => {
      if (errors.length > 0) {
         const timer = setTimeout(() => {
            setErrors([]);
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [errors]);

   useEffect(() => {
      const checkLogin = async () => {
         const cookies = Cookies.get();
         if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
         }

         try {
            const res = await verifyTokenRequest(cookies.token);

            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUsers(res.data);
            setLoading(false);
         } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
         }
      };
      checkLogin();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            signup,
            signin,
            logout,
            users,
            isAuthenticated,
            loading,
            errors,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export { AuthContext, AuthProvider };

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TasksProvider } from './context/TasksContext';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <TasksProvider>
            <AuthProvider>
               <App />
            </AuthProvider>
         </TasksProvider>
      </BrowserRouter>
   </React.StrictMode>
);

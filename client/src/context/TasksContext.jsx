import { createContext, useState } from 'react';
import {
   createTaskRequest,
   getAllTasksRequest,
   deleteTaskRequest,
   getTaskRequest,
   updateTaskRequest,
} from '../api/tasks.api';

import { ToastDelete, ToastMessage } from '../alerts/sweetAlerts.alerts';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
   const [tasks, setTasks] = useState([]);

   const getAllTasks = async () => {
      try {
         const response = await getAllTasksRequest();
         setTasks(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   const createTask = async (task) => {
      try {
         const response = await createTaskRequest(task);
         if (response.status === 200)
            ToastMessage.fire({
               title: 'Task Created',
               icon: 'success',
            });
      } catch (error) {
         console.log(error);
         ToastMessage.fire({
            title: 'Error, ',
            icon: 'error',
         });
      }
   };
   const deleteTask = async (id) => {
      try {
         const confirmDelete = await ToastDelete.fire();
         if (!confirmDelete.isConfirmed) return;

         const response = await deleteTaskRequest(id);

         if (response.status === 204) {
            const newTasks = tasks.filter((task) => task._id !== id);
            setTasks(newTasks);
            ToastMessage.fire({
               title: 'Task Delete',
               text: 'Your task has been deleted',
               icon: 'success',
            });
         }
      } catch (error) {
         console.log(error);
         ToastMessage.fire({
            title: 'Error',
            text: 'Your task not has been deleted',
            icon: 'error',
         });
      }
   };

   const getTask = async (id) => {
      try {
         const response = await getTaskRequest(id);
         return response.data;
      } catch (error) {
         console.log(error);
      }
   };
   const updateTask = async (id, task) => {
      try {
         const response = await updateTaskRequest(id, task);
         if (response.status === 200)
            ToastMessage.fire({
               title: 'Task update success!',
               icon: 'success',
            });
      } catch (error) {
         console.log(error);
         ToastMessage.fire({
            title: 'Error, ',
            icon: 'error',
         });
      }
   };

   return (
      <TasksContext.Provider
         value={{
            tasks,
            createTask,
            getAllTasks,
            getTask,
            updateTask,
            deleteTask,
         }}
      >
         {children}
      </TasksContext.Provider>
   );
};

export { TasksContext, TasksProvider };

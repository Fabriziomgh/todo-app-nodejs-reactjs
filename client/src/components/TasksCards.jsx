import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TasksContext } from '../context/TasksContext';
import {
   AiOutlineCalendar,
   AiOutlineEdit,
   AiOutlineDelete,
} from 'react-icons/ai';

dayjs.extend(utc);

const TasksCards = ({ task }) => {
   const { deleteTask } = useContext(TasksContext);
   const date = dayjs(task.date).utc().format('DD/MM/YYYY');
   return (
      <div className="relative w-64 p-4 m-auto bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100 shadow-lg rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-100 ">
         <div className="w-full h-full ">
            <div className="flex flex-col p-4 justify-between h-full">
               <p className="absolute text-sm italic text-gray-800  top-2 right-2">
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center gap-2  border border-pink-400">
                     <AiOutlineCalendar />
                     {date}
                  </span>
               </p>
               <p className="mt-4 text-lg text-gray-900  break-words ">
                  {task.title}
               </p>
               <p className=" py-2 text-xs   text-gray-700 ">
                  {task.description}
               </p>
            </div>
         </div>
         <div className="flex justify-around">
            <Link
               to={`/edit-task/${task._id}`}
               className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center gap-2 "
            >
               <AiOutlineEdit />
               Edit
            </Link>
            <button
               onClick={() => deleteTask(task._id)}
               className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center gap-2 "
            >
               <AiOutlineDelete />
               Delete
            </button>
         </div>
      </div>
   );
};

export default TasksCards;

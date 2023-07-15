import { useContext, useEffect } from 'react';
import { TasksContext } from '../context/TasksContext';
import TasksCards from '../components/TasksCards';

const TasksPage = () => {
   const { tasks, getAllTasks } = useContext(TasksContext);

   useEffect(() => {
      getAllTasks();
   }, []);

   return (
      <div className="p-5">
         <h2 className="py-10 text-4xl text-center font-semibold">My tasks</h2>

         <div className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {tasks.length === 0 && (
               <h2 className="text-center font-bold text-3xl">No have tasks</h2>
            )}
            {tasks.map((task) => (
               <TasksCards key={task._id} task={task} />
            ))}
         </div>
      </div>
   );
};

export default TasksPage;

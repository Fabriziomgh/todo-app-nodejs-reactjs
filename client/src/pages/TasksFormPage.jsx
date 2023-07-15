import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { TasksContext } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import ErrorMessage from '../components/ErrorMessage';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TasksFormPage = () => {
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      reset,
   } = useForm();
   const navigate = useNavigate();
   const { createTask, getTask, updateTask } = useContext(TasksContext);
   const params = useParams();
   useEffect(() => {
      async function get() {
         try {
            if (!params.id) return;
            const { title, description, date } = await getTask(params.id);
            const newDate = dayjs(date).utc().format('YYYY-MM-DD');
            setValue('title', title);
            setValue('description', description);
            setValue('date', newDate);
         } catch (error) {
            console.log(error);
         }
      }
      get();
   }, []);

   const onSubmit = (data) => {
      if (params.id) {
         updateTask(params.id, {
            ...data,
            date: dayjs.utc(data.date).format(),
         });
      } else {
         createTask({
            ...data,
            date: dayjs.utc(data.date).format(),
         });
      }
      navigate('/tasks');
      reset();
   };
   return (
      <div className="flex flex-col items-center">
         <h1 className="p-10 font-semibold text-4xl">Add new task</h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-96 p-4 bg-slate-700 rounded-md shadow-md "
         >
            <div className="mb-2">
               <CustomInput
                  className="text-white"
                  label="title"
                  register={register}
                  objValidations={{
                     required: {
                        value: true,
                        message: 'Title is required.',
                     },
                  }}
                  type="text"
                  placeholder="Title..."
               />
               {errors.title && <ErrorMessage error={errors.title?.message} />}
            </div>
            <div className="text-white mb-2">
               <label className="block mb-2 text-sm font-medium ">
                  Your message
               </label>
               <textarea
                  {...register('description', {
                     required: {
                        value: true,
                        message: 'I need a short description.',
                     },
                  })}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Leave a comment..."
               />
               {errors.description && (
                  <ErrorMessage error={errors.description?.message} />
               )}
            </div>
            <div className="mb-4">
               <CustomInput
                  className="text-white"
                  label="date"
                  register={register}
                  objValidations={{
                     required: {
                        value: true,
                        message: 'Date is require.',
                     },
                  }}
                  type="date"
                  placeholder=""
               />
               {errors.date && <ErrorMessage error={errors.date?.message} />}
            </div>

            <CustomButton text="Save" />
         </form>
      </div>
   );
};

export default TasksFormPage;

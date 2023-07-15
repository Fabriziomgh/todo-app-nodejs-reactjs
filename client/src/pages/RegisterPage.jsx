import { useForm } from 'react-hook-form';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ErrorMessage from '../components/ErrorMessage';

const RegisterPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const {
      signup,
      isAuthenticated,
      errors: registerErrors,
   } = useContext(AuthContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated) navigate('/tasks');
   }, [isAuthenticated]);

   const onSubmit = async (data) => {
      signup(data);
   };
   return (
      <div className="flex flex-col items-center ">
         <div className="p-8">
            <h1 className="text-4xl font-semibold">Register</h1>
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-96 bg-white p-10 rounded-md shadow-lg "
         >
            {registerErrors.map((error, i) => (
               <small
                  className="text-white py-2 block text-center bg-red-400"
                  key={i}
               >
                  {error}
               </small>
            ))}
            <div className="mb-2">
               <CustomInput
                  label="username"
                  register={register}
                  objValidations={{
                     required: {
                        value: true,
                        message: 'Username is required.',
                     },
                  }}
                  type="text"
                  placeholder="Username..."
               />
               {errors.username && (
                  <ErrorMessage error={errors.username?.message} />
               )}
            </div>
            <div className="mb-2">
               <CustomInput
                  label="email"
                  register={register}
                  objValidations={{
                     required: {
                        value: true,
                        message: 'Email is required.',
                     },
                     pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email.',
                     },
                  }}
                  type="email"
                  placeholder="email@email.com"
               />
               {errors.email && <ErrorMessage error={errors.email?.message} />}
            </div>

            <div className="mb-2">
               <CustomInput
                  label="password"
                  register={register}
                  objValidations={{
                     required: {
                        value: true,
                        message: 'Password is require.',
                     },
                     minLength: {
                        value: 6,
                        message: 'Password más de 6 caracteres',
                     },
                  }}
                  type="password"
                  placeholder="******"
               />
               {errors.password && (
                  <ErrorMessage error={errors.password?.message} />
               )}
            </div>

            <CustomButton text="Register" />
         </form>
         <p className="py-2 flex gap-2">
            ¿Ya tienes cuenta?
            <Link to="/login" className="text-sky-500">
               Sign in
            </Link>
         </p>
      </div>
   );
};

export default RegisterPage;

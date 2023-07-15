import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const {
      signin,
      errors: signinErrors,
      isAuthenticated,
   } = useContext(AuthContext);

   const onSubmit = (data) => {
      signin(data);
   };
   const navigate = useNavigate();
   useEffect(() => {
      if (isAuthenticated) navigate('/tasks');
   }, [isAuthenticated]);
   return (
      <div className="flex flex-col items-center ">
         <div className="p-8">
            <h1 className="text-4xl font-semibold">Login</h1>
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-96 bg-white p-10 rounded-md shadow-lg "
         >
            {signinErrors.map((error, i) => (
               <small
                  className="py-2 text-center block text-white  bg-red-400"
                  key={i}
               >
                  {error}
               </small>
            ))}
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
                        message: 'Email is invalid.',
                     },
                  }}
                  errors={errors}
                  type="email"
                  placeholder="Email..."
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
                        message: 'Password is required.',
                     },
                     minLength: {
                        value: 6,
                        message: 'Password más de 6 caracteres',
                     },
                  }}
                  errors={errors}
                  type="password"
                  placeholder="Password..."
               />
               {errors.password && (
                  <ErrorMessage error={errors.password?.message} />
               )}
            </div>
            <CustomButton text="Login" />
         </form>
         <p className="py-2 flex gap-2">
            ¿No tienes cuenta?
            <Link to="/register" className="text-sky-500">
               Sign up
            </Link>
         </p>
      </div>
   );
};

export default LoginPage;

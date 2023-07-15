const CustomInput = ({
   label,
   register,
   objValidations,
   type,
   placeholder,
   className = 'text-gray-900 ',
}) => {
   return (
      <>
         <label className={`block mb-2 text-sm font-medium ${className}`}>
            Your <span className="italic">{label}</span>
         </label>
         <input
            {...register(label, objValidations)}
            type={type}
            id={type}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder={placeholder}
         />
      </>
   );
};

export default CustomInput;

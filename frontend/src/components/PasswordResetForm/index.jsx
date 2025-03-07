import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, } from 'react-router-dom';

export default function PasswordResetForm() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {resetToken} = useParams()
  
  const onSubmit = async (data) => {
    try {
      setError(null)
      const url = `http://localhost:3000/api/auth/reset-password/${resetToken}`
      if(data.confirmPassword === data.password){
        const password = data.confirmPassword 
        const body = {password}
        await axios.post(url, body)
        navigate("/login");
      }else{
        setError('Las contraseñas no coinciden.')
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message
        if (errorMessage.includes('Password Reset Failed')) {
          setError('El reestablecimiento de contraseña ha fallado')
        } else {
          setError('Hubo un error en el reestablecimiento de contraseña, intente de nuevo.')
        }
      } else {
        setError('Un error inesperado a ocurrido. Intente de nuevo en otro momento.')
      }
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-1/3 p-6 mt-32 rounded-lg  shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Define tu nueva contraseña
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-md font-medium">
              Introduzca la nueva contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true, minLength: 6 })}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                La contraseña es requerida y debe tener mínimo 6 carácteres.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-md font-medium">
              Confirme la nueva contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true, minLength: 6 })}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                La contraseña es requerida y debe tener mínimo 6 carácteres.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Confirmar
          </button>
          {error && (
            <div className="text-red-500 mt-1">{error}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mt-1">{successMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

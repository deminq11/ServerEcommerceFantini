import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import VerificationPopUp from '../VerificationPopUp';

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const { signIn } = useUserContext()
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const isRegisterMode = pathname === '/register';
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handlePopUp = (show, email, password, type="verification") => {
    setPopUp({ show, email, password, type })
  }
  const handleResetPopUp = (show, email, type="password-reset") => {
    setPopUp({ show, email, type })
  }
  const onSubmit = async (data) => {
    try {
      setError(null)
      if (isRegisterMode) {
        const url = `${import.meta.env.VITE_API_URL}/auth/register`
        const body = data
        await axios.post(url, body)
        setSuccessMessage("Se ha registrado exitosamente, verifique su email...")
        handlePopUp(true, data.email, data.password)
      } else {
        await signIn(data)
        setSuccessMessage("Ha iniciado sesión exitosamente.")
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message
        if (errorMessage.includes('USER ALREADY EXISTS')) {
          setError('El usuario ya está registrado.')
        } else if (errorMessage.includes('INVALID CREDENTIALS')) {
          setError('Contraseña o email inválidos, intente de nuevo.')
        } else if (errorMessage.includes('USER NOT FOUND')) {
          setError('Ese usuario no está registrado.')
        } else if (errorMessage.includes('USER ALREADY LOGGED IN')) {
          setError('El usuario ya está en sesión.')
        } else {
          setError('Hubo un error en la validación de datos, intente de nuevo.')
        }
      } else {
        setError('Un error inesperado a ocurrido. Intente de nuevo en otro momento.')
      }
    }
  }
  return (
    <div className="flex items-center justify-center">
      {popUp.show && <>
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-neutral-900 opacity-25"></div>
        <VerificationPopUp popUp={popUp} setPopUp={setPopUp} />
      </>}
      <div className="w-1/4 p-6 mt-32 rounded-lg  shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          {isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {isRegisterMode ? <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="name"
              id="name"
              {...register('name', { required: true })}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Tu nombre es requerido</p>
            )}
          </div> : ""}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">El email es requerido</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
          {error && (
            <div className="text-red-500 mt-1">{error}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mt-1">{successMessage}</div>
          )}
        </form>
            {error === 'Contraseña o email inválidos, intente de nuevo.' ? 
             <p>
               Olvidaste tu contraseña? <button
                 type="button"
                 onClick={handleResetPopUp}
                 className="text-violet-400 hover:underline"
               >Recupérala</button>
             </p>
            :""}
        <div className="mt-6 text-center">
          <p>
            {isRegisterMode
              ? "Ya estás registrado? "
              : 'No estás registrado? '}
            <Link
              type="button"
              to={isRegisterMode ? "/login" : "/register"}
              className="text-blue-500 hover:underline"
            >
              {isRegisterMode ? 'Inicia Sesión' : 'Regístrate aquí'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

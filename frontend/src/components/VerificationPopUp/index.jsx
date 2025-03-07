import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

export default function VerificationPopUp({ popUp, setPopUp }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resendCount, setResendCount] = useState(0);
  const { signIn } = useUserContext()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const email = popUp.email  
  const password = popUp.password  
  const type = popUp.type  
  const onSubmit = async (formData) => {
    try {
      setError(null)
      if(type === "verification"){
        const url = `${import.meta.env.VITE_API_URL}/api/auth/verify`
        const verifyClientCode = formData.code
        const body = { email , verifyClientCode }
        const {data} = await axios.post(url, body)
        if(data.response === true){
          setSuccessMessage("Usuario verificado exitosamente.")
        }
        await signIn({ email, password })
        handleClosePopUp()
        navigate("/")
      }else if(type === "password-reset"){
        const url = `${import.meta.env.VITE_API_URL}/api/auth/send-password-reset`
        const body = {email: formData.email}
        const {data} = await axios.post(url, body)
        console.log(data)
        if(data.response){
          setSuccessMessage("El email ha sido enviado.")
        }
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status >= 400) {
        const errorMessage = error.response.data.message
        if (errorMessage.includes('User Verification Failed')) {
          setError('La verificación de usuario ha fallado, intente de nuevo')
        }else if (errorMessage.includes('User Verification Failed')) {

        } else {
          setError("Ocurrió un error, intente de nuevo.")
        }
      }
    }
  }
  const handleResend = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/auth/resend-verify-code`
      const body = { email }
      const response = await axios.post(url, body)
      if (response.ok) {
        setResendCount(resendCount + 1)
      } else {
        throw error
      }
    } catch (error) {
      setError('Hubo un error al reenviar el código')
    }
  }
  const handleClosePopUp = ()=>{
    setPopUp(false)
   }
  
  return (
    <div className="z-50 w-full h-full absolute flex items-center justify-center">
      <div className="relative p-6 w-1/3 h-2/5 bg-neutral-700 rounded-lg  shadow-xl">
        <button onClick={handleClosePopUp} className='absolute top-0 right-3 text-xl'>x</button>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl font-semibold border-b-2 border-neutral-600'>{type === "verification"? "Verificación de mail" : "Recuperación de contraseña"}</h2>
          {type === "verification"?<p className='text-md'>Hemos enviado un código de verificación a su cuenta de email.</p>:""}
          <div className="space-y-3">
            <label htmlFor={type === "verification"? "code" : "email"} className="block text-lg font-semibold">{type === "verification"? "Introduzca su código aquí" : "Introduzca su email aquí"}:</label>
            <input
              type="text"
              id={type === "verification"? "code" : "email"}
              {...register('email', { required: true })}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.code||errors.email && <span className="text-red-500 mt-1">{type === "verification"? "Introduzca el código" : "Introduzca el email"}</span>}
          </div>

          {successMessage? "":<button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" >{type === "verification"? "Verificar" : "Enviar"}</button>}
          {error && (
            <div className="text-red-500 text-sm mt-1">{error}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mt-1">{successMessage}</div>
          )}
          {/* {resendCount < 3 ?
            <button type="button" onClick={handleResend} className='hover:underline'>
              Reenviar Código
            </button>
            : <div className="text-red-500 mt-1"> Demasiados reintentos </div>
          } */}
        </form>
      </div>
    </div>
  );
}

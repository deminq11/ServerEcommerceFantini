import { Link } from "react-router-dom"
import { useUserContext } from "../../context/userContext";
export default function UserWidgetMenu({ handleActive }) {
    const {user,signOut} = useUserContext()
    const handleSignout = async ()=>{
        signOut()
        handleActive()
    }
    return (
        <div className="space-y-1 absolute top-6 right-6 min-w-48 p-1 grid grid-cols-1 rounded-2xl shadow-md bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/50">
            {user ?
                <>
                    <div className="p-1 pl-2 border-b w-full rounded-md mb-1 text-lg font-medium border-neutral-700 dark:text-neutral-200"><i className="text-medium fa-regular fa-id-badge"></i> {user.name} </div>
                    <Link onClick={handleActive} to="/user" className="p-1 pl-2 border-b w-full rounded-2xl text-base font-normal border-neutral-800 dark:text-neutral-200 dark:hover:text-violet-200"><i className="text-sm fas fa-user-cog"></i> Ir al perfil</Link>
                    <button onClick={handleSignout} className="text-left p-1 pl-2 border-b rounded-2xl text-base font-normal border-neutral-800 dark:text-neutral-200 dark:hover:text-violet-200"><i className="text-sm fas fa-sign-out-alt"></i> Cerrar Sesión</button>
                </> :
                <Link onClick={handleActive} to="/login" className="block p-1 pl-2 border-b rounded-2xl border-neutral-800 text-base font-normal dark:text-neutral-200 dark:hover:text-violet-200"><i className="text-sm fas fa-sign-in-alt"></i> Iniciar Sesión</Link>

            }
        </div>
    )
}
import { createContext , useContext } from "react";

export const userContext = createContext([])

export const useUserContext = () => useContext(userContext)
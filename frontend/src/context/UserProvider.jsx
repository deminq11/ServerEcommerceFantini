import { userContext } from "./userContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        checkUser()
    }, []);
    const checkUser = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/current`, { withCredentials: true })
            if (data.message === "ONLINE") {
                setUser(data.response)
            }
        } catch (error) {
            setUser(null)
        }
    }
    const signOut = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signout`, {}, { withCredentials: true })
            if (data.response === "OK") {
                setUser(null)
                checkUser()
            }
        } catch (error) {
            throw error
        }
    }
    const signIn = async (body) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, body, { withCredentials: true })
            if (data.response === "OK") {
                setUser(null)
                checkUser()
            }
        } catch (error) {
            throw error
        }
    }
    return (
        <userContext.Provider value={{ user, signOut, signIn }}>
            {children}
        </userContext.Provider>
    )
}
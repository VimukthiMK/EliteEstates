import { createContext, useEffect, useState } from "react"
import apiRequest from "src/lib/apiReq"

export const NotificationContext = createContext()

//Current User
export const NotificationContextProvider = ({ children }) => {
    const [number, setNumber] = useState(0)

    const fetchNotifications = async () => {
        try {
            const res = await apiRequest("/users/notification")
            setNumber(res.data)
        } catch (err) {
            console.error("Failed to fetch notifications")
        }
    }

    const decrease = () => {
        setNumber((prev) => Math.max(prev - 1, 0))
    }

    const reset = () => {
        setNumber(0)
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <NotificationContext.Provider value={{ decrease, reset ,fetchNotifications, number}}>
            {children}
        </NotificationContext.Provider>
    )
}
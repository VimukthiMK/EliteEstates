import { useState, useContext } from "react"
import "src/routes/login/login.scss"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "src/context/AuthContext";

import apiRequest from "src/lib/apiReq"
import AuthBanner from "src/assets/images/auth-banner.jpg"

function Login() {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {updateUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")
        const formData = new FormData(e.target)

        const username = formData.get("username")
        const password = formData.get("password")

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password,
            })
            // set logged user as current user
            await updateUser(res.data)
            // Navigate to Homepage
            navigate("/")   

        } catch (err) {
            setMessage(err.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input
                        name="username"
                        required
                        minLength={3}
                        maxLength={20}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <button disabled={isLoading}>Login</button>
                    {message && <span>{message}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src={AuthBanner} alt="" />
            </div>
        </div>
    )
}

export default Login
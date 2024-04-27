import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import apiRequest from "src/lib/apiReq"
import "src/routes/register/register.scss"
import AuthBanner from "src/assets/images/auth-banner.jpg"

function Register() {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        setIsLoading(true)
        const formData = new FormData(e.target)

        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const res = await apiRequest.post("/auth/register", {
                username,
                email,
                password,
            })

            setMessage(res.data.message)

            // Delay navigation to login page by 3 seconds
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        } catch (err) {
            setMessage(err.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="registerPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username" required />
                    <input name="email" type="text" placeholder="Email" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <button disabled={isLoading}>Register</button>
                    {message && <span>{message}</span>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src={AuthBanner} alt="banner" />
            </div>
        </div>
    )
}

export default Register
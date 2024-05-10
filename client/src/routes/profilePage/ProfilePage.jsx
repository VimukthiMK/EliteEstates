import { Link, useNavigate } from "react-router-dom"
import apiRequest from 'src/lib/apiReq'
import { useContext } from "react"
import { AuthContext } from "src/context/AuthContext"

import "src/routes/profilePage/profilePage.scss"
import NoAvatar from "src/assets/icon/no-avatar.svg"

function ProfilePage() {
    const { updateUser, currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout")
            updateUser(null)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img src={currentUser.avatar || NoAvatar} alt="" />
                        </span>
                        <span>
                            Username: <b>{currentUser.username}</b>
                        </span>
                        <span>
                            E-mail: <b>{currentUser.email}</b>
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage
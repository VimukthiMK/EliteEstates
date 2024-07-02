import { Link, useNavigate } from "react-router-dom"
import apiRequest from 'src/lib/apiReq'
import { useContext, Suspense, useEffect, useState } from "react"
import { AuthContext } from "src/context/AuthContext"
import List from 'src/components/list/List'

import "src/routes/profilePage/profilePage.scss"
import NoAvatar from "src/assets/icon/no-avatar.svg"
import Chat from "src/components/chat/Chat"

function ProfilePage() {
    const { updateUser, currentUser } = useContext(AuthContext)
    const [userPosts, setUserPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([])

    const navigate = useNavigate()

    //Fetch user Posts and Saved Posts
    useEffect(() => {
        fetchUserPost()
    }, [currentUser])

    const fetchUserPost = async () => {
        try {
            const res = await apiRequest.get('/users/profilePosts')
            setUserPosts(res.data.userPosts)
            setSavedPosts(res.data.savedPosts)
        } catch (error) {
            console.log(error)
        }
    }
    // Logout
    const handleLogout = async () => {
        try {
            const confirmed = window.confirm("Are you sure you want to logout?")
            if (confirmed) {
                await apiRequest.post("/auth/logout")
                updateUser(null)
                navigate("/")
            }
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

                    {/* User Posts */}
                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/add">
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <List posts={userPosts} />
                    </Suspense>

                    {/* Saved posts - User */}
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <List posts={savedPosts} />
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                {/* Chat */}
                <div className="wrapper">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Chat />
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage
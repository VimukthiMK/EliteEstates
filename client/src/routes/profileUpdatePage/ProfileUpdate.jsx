import { useContext, useState } from "react"
import { AuthContext } from "src/context/AuthContext"
import apiRequest from "src/lib/apiReq"
import { useNavigate } from "react-router-dom"
import NoAvatar from "src/assets/icon/no-avatar.svg"
import { storage } from "src/config/FirebaseConfig"
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import 'src/routes/profileUpdatePage/profileUpdate.scss'

const ProfileUpdate = () => {
  const { currentUser, updateUser } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [avatar, setAvatar] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)

    // Display the selected image as a preview in the avatar section
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        document.getElementById('avatarPreview').src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // Handling the upload
  const handleUpload = async () => {
    try {
      if (avatar) {
        const imageRef = storageRef(storage, `avatars/${avatar.name}`)
        await uploadBytes(imageRef, avatar)
        const url = await getDownloadURL(imageRef)
        return url
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      throw error 
    }
  }

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const avatarUrl = await handleUpload() // Enable image upload
      const formData = new FormData(e.target)
      const { username, email, password } = Object.fromEntries(formData)
      
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatarUrl || currentUser.avatar, // Keep the current avatar if no new one is uploaded
      })

      // Update the current user data
      updateUser(res.data)
      // Navigate to Profile
      navigate("/profile")
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>

          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>

          {/* Avatar */}
          <div className="item">
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button>Update</button>
          {/* Handle Errors */}
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        {/* Display the current avatar or a placeholder */}
        <img src={currentUser.avatar || NoAvatar} alt="Current Avatar" id="avatarPreview" className="avatar" />
      </div>
    </div>
  )
}

export default ProfileUpdate

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'src/App.css'

import { Layout, RequireAuth } from 'src/routes/layout/Layout'
import Register from 'src/routes/register/Register'
import Login from 'src/routes/login/login'
import Home from 'src/routes/homePage/HomePage'
import Profile from 'src/routes/profilePage/ProfilePage'
import ProfileUpdate from 'src/routes/profileUpdatePage/ProfileUpdate'
import NewPostPage from 'src/routes/newPostPage/NewPostPage'


function App() {

  return (
    <Router>
      <Routes>
        {/* General */}
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Route>

        {/* Protected */}
        <Route path="/" element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<ProfileUpdate />} />
          <Route path="/add" element={<NewPostPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

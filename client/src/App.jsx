import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { Layout, RequireAuth }from 'src/routes/layout/Layout'
import Register from 'src/routes/register/Register'
import Login from 'src/routes/login/login'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path = "/register" element = {<Register />} /> 
          <Route path = "/login" element = {<Login/>} /> 
        </Route>

        {/* Protected */}
        <Route path="/" element={<RequireAuth />}>
          {/* <Route element={<Home />} path="/" exact />
          <Route element={<Products />} path="/products" /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App

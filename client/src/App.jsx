import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, RequireAuth }from 'src/routes/layout/Layout'
import Register from 'src/routes/register/Register'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path = "/register" element = {<Register />} /> 
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

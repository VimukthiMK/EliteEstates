import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, RequireAuth }from 'src/routes/layout/Layout'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route element={<Home />} path="/" exact />
          <Route element={<Products />} path="/products" /> */}
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

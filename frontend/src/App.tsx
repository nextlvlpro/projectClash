import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/home/Home"
import HomeLayout from "./layout/homeLayout/HomeLayout"
import Players from "./views/playersPage/Players"
import axios from "axios"
import {baseAddress} from "../config"
import Register from "./views/auth/Register"
import ThemeInitializer from "./theme/ThemeInitializer"
import { ToastContainer } from "react-toastify"
import Login from "./views/auth/Login"
function App() {
axios.defaults.baseURL = baseAddress
axios.defaults.withCredentials = true

  return (
    <BrowserRouter>
    <ThemeInitializer />
      <HomeLayout >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="players" element={<Players />} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/auth/login" element={<Login/>} />
        </Routes>
      </HomeLayout>
      <ToastContainer/>
    </BrowserRouter>
    
  )
}

export default App

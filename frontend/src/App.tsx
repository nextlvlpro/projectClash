import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/home/Home"
import HomeLayout from "./layout/homeLayout/HomeLayout"
import Players from "./views/playersPage/Players"
import axios from "axios"
import {baseAddress} from "../config"
import Register from "./views/auth/Register"
import ThemeInitializer from "./theme/ThemeInitializer"
function App() {
axios.defaults.baseURL = baseAddress

  return (
    <BrowserRouter>
    <ThemeInitializer />
      <HomeLayout >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="players" element={<Players />} />
          <Route path="/auth/register" element={<Register/>} />
        </Routes>
      </HomeLayout>
    </BrowserRouter>
  )
}

export default App

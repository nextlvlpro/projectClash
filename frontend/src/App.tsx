import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/home/Home"
import HomeLayout from "./layout/homeLayout/HomeLayout"
function App() {

  return (
    <BrowserRouter>
      <HomeLayout >
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </HomeLayout>
    </BrowserRouter>
  )
}

export default App

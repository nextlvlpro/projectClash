import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/home/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import Players from "./components/pages/players/Players";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/players" element={<Players/>} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

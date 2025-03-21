import React, { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:5000/test")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="App">
     <LandingPage/>
    </div>
  );
}

export default App;

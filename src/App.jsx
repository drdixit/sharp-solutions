import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts.jsx";
import './App.css'
import Header from "./Header/Header.jsx"

function App() {
  const userHook = useState(null);

  return (
    <UserContext.Provider value={userHook}>
      <Header/>
      <div>
        <h1>Hello from App.jsx</h1>
        <Outlet/>
      </div>
    </UserContext.Provider>
  )
}

export default App

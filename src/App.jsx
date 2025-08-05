import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts.jsx";
import './App.css'

function App() {
  const userHook = useState(null);

  return (
    <UserContext.Provider value={userHook}>
      <div>
        <h1>Hello from App.jsx</h1>
        <Outlet/>
      </div>
    </UserContext.Provider>
  )
}

export default App

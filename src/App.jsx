import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts.jsx";
import './App.css'
import Navbar from "./Navbar/Navbar.jsx"

function App() {
  const userHook = useState(null);

  return (
    <UserContext.Provider value={userHook}>
      <div className="min-h-full">
        <Navbar/>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet/>
          </div>
        </main>
      </div>
    </UserContext.Provider>
  )
}

export default App

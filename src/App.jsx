import { Outlet } from "react-router-dom";
import './App.css'
import UserContextProvider from "./context/UserContextProvider.jsx";

function App() {

  return (
    <UserContextProvider>
      <div>
        <h1>Hello from App.jsx</h1>
        <Outlet/>
      </div>
    </UserContextProvider>
  )
}

export default App

import authService from "../appwrite/auth.js";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext.js";
import { Link } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    currentUser().then(() => {
      // Promise resolved
    }).catch((error) => {
      console.error("Error fetching user:", error);
    });
  }, [])

  const handleLogin = () => {
    authService.oAuth2Login();
  }

  const handleLogout = async () => {
    await authService.logout();
  };

  const currentUser = async () => {
    const data = await authService.getCurrentUser();
    setUserData(data);
    setUser(data);
    console.log("Current User", data);
  }


  return (
    <div>
      <Link to="/">home</Link>
      <h1>user {user ? user.name : null}</h1>
      {
        userData ? (
          <button onClick={handleLogout}
                  className="text-xl px-2 py-1 font-bold border-2 border-black rounded-lg">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin}
                  className="text-xl px-2 py-1 font-bold border-2 border-black rounded-lg">
            Login With Google
          </button>
        )
      }
      <button onClick={currentUser} className="text-xl px-2 py-1 font-bold border-2 border-black rounded-lg">Get User
        Data
      </button>
    </div>
  )
}

export default Login;

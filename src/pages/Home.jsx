import { Link } from "react-router-dom";
import { useContext, useEffect, useCallback } from "react";
import { UserContext } from "../contexts.jsx";
import authService from "../appwrite/auth.js";

export function Home() {
  const [user, setUser] = useContext(UserContext);

  // Check for existing session on page load (similar to Login.jsx)
  const getCurrentUser = useCallback(async () => {
    try {
      const data = await authService.getCurrentUser();
      if (data) {
        setUser(data);
        console.log("User session restored:", data.name);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      setUser(null);
    }
  }, [setUser]);

  // Prefetch user session on component mount
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className="p-6">
      {/* User Status Section */}
      <div className="mb-6">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ) : (
          <p className="text-lg">Welcome, Guest!</p>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <h2 className="text-xl">Home Page</h2>

        {/* Navigation Links */}
        <div className="flex gap-4">
          {user ? (
            <Link
              to="/login"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;

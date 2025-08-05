import authService from "../appwrite/auth.js";
import { useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts.jsx";

function Login() {
  const [user, setUser] = useContext(UserContext);

  // Memoized function to prevent recreating on every render
  const getCurrentUser = useCallback(async () => {
    console.log("Fetching current user...");
    try {
      const data = await authService.getCurrentUser();
      console.log("Auth service returned:", data);

      if (data) {
        setUser(data);
        console.log("User set in context:", data.name);
      } else {
        console.log("No authenticated user found");
        setUser(null); // Explicitly set null for clarity
      }
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      setUser(null); // Set null on error
    }
  }, [setUser]);

  // Check for existing session on component mount
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleLogin = () => {
    authService.oAuth2Login();
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Home
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {user ? `Welcome, ${user.name}!` : "Please Login"}
        </h1>
        {user && (
          <p className="text-gray-600">Email: {user.email}</p>
        )}
      </div>

      <div className="space-y-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full text-xl px-4 py-2 font-bold border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full text-xl px-4 py-2 font-bold border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            Login With Google
          </button>
        )}

        <button
          onClick={getCurrentUser}
          className="w-full text-lg px-4 py-2 font-medium border-2 border-gray-500 text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg transition-colors">
          Refresh User Data
        </button>
      </div>
    </div>
  );
}

export default Login;

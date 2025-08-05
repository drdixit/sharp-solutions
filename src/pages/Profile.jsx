import Avatar from "../components/Avatar.jsx";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../contexts.jsx";
import authService from "../appwrite/auth.js";

export function Profile() {

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

  return user ? (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar name={user.name} className={"w-20 h-20 text-4xl"}/>
        <div>
          <p className="flex items-center text-gray-900 text-lg font-semibold">
            {user.name}
            {user.emailVerification ? (
              <>
                <svg
                  className="w-5 h-5 ml-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="ml-1 text-sm text-blue-500">Verified</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 ml-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="ml-1 text-sm text-gray-400">Unverified</span>
              </>
            )}
          </p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">
            Registration: {new Date(user.registration).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
      <h1 className="text-1xl mb-6">Loading...</h1>
    </div>
  )
}

export default Profile;

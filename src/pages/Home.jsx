import { useContext } from "react";
import UserContext from "../context/UserContext.js";
import { Link } from "react-router-dom";

export function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>{user ? user.name : null}</h1>
      <p>Home Page</p>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Home;

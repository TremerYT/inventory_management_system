import {Navigate} from "react-router";
import useAuth from "../../hooks/useAuth.js";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={'/login'}/>
  }

  return children;
}

export default PrivateRoute;
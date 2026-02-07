import {Navigate} from "react-router";
import {useAuth} from "../../context/auth/auth_provider.jsx";


const PrivateRoute = ({children}) => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to={'/login'}/>
  }

  return children;
}

export default PrivateRoute;
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//create custom hook to fetch data from AuthContext
const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;
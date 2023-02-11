import axios from '../api/axios';
import useAuth from './useAuth';

//hook to automate logout
const useLogout = () => {
  const { setAuth } = useAuth();

  //send req. to logout rote
  const logout = async () => {
    setAuth({});
    try{
      await axios('/logout')
    }
    catch(e){
      console.error(e);
    }
  }
  return logout;
}

export default useLogout;
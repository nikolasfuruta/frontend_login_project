import axios from '../api/axios';
import useAuth from './useAuth';

//custom hook to return refresh function
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  //get the refresh token from the backend
  const refresh = async () => {
    const response = await axios.get('/refresh', {
    });

    //set the return response from backend to the auth state
    //we use 'prev' because the user could already have the accessToken, so we want to override it
    setAuth(prev => {
      console.log(JSON.stringify(prev)); //look at previous data
      console.log(response.data.accessToken);//look at response data
      //now modify the auth state 
      return {
        user: response.data.user,
        accessToken:response.data.accessToken
      }
    });
    //return the response so that we can use it at req.
    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken;
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from './useRefreshToken';
import useAuth from "./useAuth";

//custom hooks for treat axios data
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(()=>{
    //interceptor is like eventsListner for axios;
    //create interceptor for request
    const requestIntercept = axiosPrivate.interceptors.request.use(
      //if request was true
      config => {
        //if token does not exist in the header, it means the first atempt to fetch
        if(!config.headers['Authorization']){
          //add token to header
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },

      //if request was false
      error => Promise.reject(error)

    );

    //create interceptor for response
    const responseIntercept = axiosPrivate.interceptors.response.use(
      //if response is true, return reponse
      response => response,
      //else (token has been expired for ex.)
      async (error) => {
        const prevRequest = error?.config;
        //if this condidion was true
        if(error?.response?.status === 403 && !prevRequest?.sent){
          prevRequest.sent = true; //this makes you enter into conditional once
          //and automate refresh
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          //call axios to fetch again, but now with new token
          return axiosPrivate(prevRequest);
        }
        //else
        return Promise.reject(error);
      }
    );

    //cleanUp the interceptor
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  },[auth,refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
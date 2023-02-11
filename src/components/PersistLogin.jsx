import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

//component to restrict the access if no accessToken has found
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try{
        await refresh();
      }
      catch(e){
        console.error(e)
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }
    //if persist = true, but user has no accessToken, than refresh(send by cookie)
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)
    //cleanning
    return () => isMounted = false;
  }, [auth?.accessToken, persist, refresh]);


  return (
    <>
      {
        !persist
          ? <Outlet/>
          : isLoading 
            ? <p>Loading...</p>
            : <Outlet/>
      }
    </>
  )
}

export default PersistLogin
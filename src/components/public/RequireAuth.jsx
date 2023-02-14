import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

//this component is responsible to authenticate user and control protected routes
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles = decoded?.UserInfo?.roles || [];

  return (
    
    //verify if user has permission
    roles.find(role => allowedRoles?.includes(role))
      //if true, continue to the route
      ? <Outlet/>
      //verify if user has logged
      : auth?.user
        //the user is logged but has no authorization
        ? <Navigate to='unauthorized'/>
        //"state={{from: location}} replace" is responsible for turn the user back after login (checkpoint)
        : <Navigate to='login' state={{from: location}} replace/>
  );
}

export default RequireAuth;
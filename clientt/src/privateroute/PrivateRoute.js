import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const PrivateRoute = () => {
  const [state] = useContext(UserContext);

  return state.isLogin ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRouteAdmin = () => {
  const [state] = useContext(UserContext);

  console.log(state.user.role);

  if (state.user.role === "admin") {
    return <Navigate to="/adminhome" />;
  }

  return <Outlet />;
};

export const PrivateRouteUser = () => {
  const [state] = useContext(UserContext);

  console.log(state.user.role);

  if (state.user.role === "user") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

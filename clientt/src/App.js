import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import DetailBook from "./pages/DetailBook";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Complain from "./pages/Complain";
import AdminHome from "./pagesadmin/AdminHome";
import AddBook from "./pagesadmin/AddBook";
import ComplainAdmin from "./pagesadmin/ComplainAdmin";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/Api";
import {
  PrivateRoute,
  PrivateRouteAdmin,
  PrivateRouteUser,
} from "./privateroute/PrivateRoute";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      setIsLoading(false);
    } catch (err) {
      console.log("Check User Failed : ", err);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoading && !state.isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoading, state.isLogin, navigate]);
  return (
    <div>
      {isLoading ? null : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateRouteUser />}>
              <Route exact path="/adminhome" element={<AdminHome />} />
              <Route exact path="/addbook" element={<AddBook />} />
              <Route exact path="/complainadmin" element={<ComplainAdmin />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route exact path="/detailbook/:id" element={<DetailBook />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/complain" element={<Complain />} />
            </Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";

import { UserContext } from "./context/user/UserContext";

function ProtectedRoute({ children }) {
  const { user, render } = useContext(UserContext);
  const [rerender, setRerender] = render;
  const [userData, setUserData] = user;
  const location = useLocation();

  useEffect(() => {
    setRerender(!rerender);
  }, []);

  return !userData ? (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  ) : (
    children
  );
}

export default ProtectedRoute;

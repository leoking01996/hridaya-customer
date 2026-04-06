import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactElement;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const user = sessionStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
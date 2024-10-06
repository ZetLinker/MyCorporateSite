import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div></div>; // 認証状態を確認中にローディング画面を表示
  }

  return user ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;

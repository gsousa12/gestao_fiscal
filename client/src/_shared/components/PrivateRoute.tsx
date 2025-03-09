import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store/store";

const PrivateRoute: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const sessionToken = sessionStorage.getItem("access_token");
  return token || sessionToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

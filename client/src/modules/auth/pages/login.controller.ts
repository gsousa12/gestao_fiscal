import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../_shared/redux/store/store";
import { loginUser } from "../redux/slice/authSlice";

export const useLoginController = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta?.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return {
    loading,
    error,
    token,
    handleLogin,
    navigate,
  };
};

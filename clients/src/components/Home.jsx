import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

import AdminDashbord from "./AdminDashbord";
import LoginForm from "./login";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <AdminDashbord />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;

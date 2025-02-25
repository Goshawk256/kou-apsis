import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import HomePage from "./home/HomePage";
import Login from "./login/Login";
import Finish from "./academic/components/pages/finish/Finish";
import Register from "./register/Register";
import SetPassword from "./register/setpassword/SetPassword";

const AxiosInterceptor = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          const refreshToken = localStorage.getItem("refreshToken");
          try {
            axios
              .post("https://apsis.kocaeli.edu.tr/api/auth/refresh", {
                refreshToken,
              })
              .then((response) => {
                if (response.data.success) {
                  localStorage.setItem(
                    "accessToken",
                    response.data.data.accessToken
                  );
                  localStorage.setItem(
                    "refreshToken",
                    response.data.data.refreshToken
                  );
                  axios(error.config);
                  navigate("/home");
                } else {
                  navigate("/");
                }
              });
          } catch (error) {
            console.log("Error fetching data:", error);
            navigate("/");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-password/:token" element={<SetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;

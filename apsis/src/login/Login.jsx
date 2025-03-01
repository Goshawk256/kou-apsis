import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Logo from "../assets/unnamed.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const isTokenExpired = (token) => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp < Math.floor(Date.now() / 1000);
      } catch (error) {
        console.error("JWT çözümleme hatası:", error);
        return true;
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.post("/api/auth/refresh", {
          refreshToken,
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        });

        if (response.data.success) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          navigate("/home"); // Token yenilendiyse yönlendir
        } else {
          console.error("Token yenilenemedi");
        }
      } catch (error) {
        console.error("Token yenileme hatası:", error);
      }
    };

    if (accessToken) {
      if (!isTokenExpired(accessToken)) {
        navigate("/home"); // Token geçerli ise direkt yönlendir
      } else if (refreshToken) {
        refreshAccessToken(); // Token süresi dolmuşsa yenilemeye çalış
      }
    }
  }, [navigate]);
  
  useEffect(() => {
    if (roles.length === 1 && roles[0] === "Academic") {
      setSelectedRole("Academic");
    } else if (roles.length > 0) {
      setSelectedRole(roles[0]); 
    }
  }, [roles]);
  

  const fetchRoles = async (username) => {
    try {
      const response = await axios.post(
        "/api/auth/get-roles",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Gelen roller:", response.data); 
  
      if (response.data.success) {
        setRoles(response.data.data);
        console.log("Gelen roller listesi:", response.data.data);
    
        if (response.data.data.length === 1 && response.data.data[0] === "Academic") {
          setSelectedRole("Academic");
        } else {
          setSelectedRole(response.data.data[0] || "Academic"); 
        }
      }
    } catch (error) {
      setError(error);
      console.error("Rol getirme hatası:", error);
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const finalRole = selectedRole || "Academic";
    
    console.log("Gönderilen veriler:", { username, password, role: finalRole });
  
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          username,
          password,
          role: finalRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("role", finalRole);
        localStorage.setItem("username", username);
        navigate("/home");
      }
    } catch (error) {
      setError(error);
      console.error("Giriş hatası:", error.response?.data || error.message);
    }
  };
  
  
  return (
    <div className="main-login">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <img style={{ width: "30%" }} src={Logo} alt="" />
          <h2 style={{ color: "white" }}>Kou Apsis</h2>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              className="input-login"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => fetchRoles(username)}
              required
            />
          </div>
          
          {roles.length > 1 || (roles.length === 1 && roles[0] !== "Academic") ? (
            <div className="form-group">
              <label htmlFor="role">Kullanıcı Rolü</label>
              <select
                className=""
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role, index) => (
                  <option
                    key={index}
                    value={role}
                    style={{ backgroundColor: "green" }}
                  >
                    {role === "Academic"
                      ? "Akademik Personel"
                      : role === "Jury"
                      ? "Jüri"
                      : role === "Rector"
                      ? "Rektörlük"
                      : role === "ExternalAcademic"
                      ? "Dışarıdan Akademisyen"
                      : role === "Student"
                      ? "Öğrenci"
                      : role === "Admin"
                      ? "Admin"
                      : "Bilinmeyen Rol"}
                  </option>
                ))}
              </select>
            </div>
          ) : console.log("Bu üyede sadece akademik personel rolü bulunmaktadır.")}
          
          <div className="form-group">
            <label className="password-label" htmlFor="password">
              Şifre
            </label>
            <input
              className="input-login"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-button-login" type="submit">
            Giriş
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

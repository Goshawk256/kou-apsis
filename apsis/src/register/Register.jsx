import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Logo from "../assets/unnamed.png";
import All_Url from "../url";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    try {
      const response = await axios.post(
        `${All_Url.api_base_url}/external-academic/register-external-user`,
        { email }
      );

      if (response.status === 204) {
        console.log("Kayıt başarılı");
        navigate("/dashboard"); // Başarıyla kayıt olan kullanıcıyı yönlendir
      } else {
        console.error("Kayıt başarısız");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className="main-login">
      <div className="login-form">
        <form onSubmit={handleRegister}>
          <img style={{ width: "30%" }} src={Logo} alt="Logo" />
          <h2 style={{ color: "white" }}>Kou Apsıs</h2>
          <div className="form-group">
            <label htmlFor="username">Eposta</label>
            <input
              className="input-login"
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button-login">
            Devam Et
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

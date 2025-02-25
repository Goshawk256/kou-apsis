import { useState } from "react";
import axios from "axios";
import "./Register.css";
import Logo from "../assets/unnamed.png";
import All_Url from "../url";

function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${All_Url.api_base_url}/external-academic/register-external-user`,
        { email }
      );

      if (response.status === 204) {
        setMessage("Şifre belirleme linki e-posta adresinize gönderildi.");
      } else {
        setError("Kayıt başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setError(
        "Kayıt sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-login">
      <div className="login-form">
        <form onSubmit={handleRegister}>
          <img style={{ width: "30%" }} src={Logo} alt="Logo" />
          <h2 style={{ color: "white" }}>Kou Apsıs</h2>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
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
          <button
            type="submit"
            className="submit-button-login"
            disabled={loading}
          >
            {loading ? "Gönderiliyor..." : "Devam Et"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

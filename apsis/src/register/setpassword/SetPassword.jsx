import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import All_Url from "../../url";
import "./SetPassword.css";

function SetPassword() {
  const { token } = useParams(); // URL'den token'ı al
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post(
        `${All_Url.api_base_url}/auth/external-user-set-password`,
        {
          loginKey: token,
          password: password,
        }
      );

      if (response.status === 204) {
        setSuccess(
          "Şifreniz başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz..."
        );
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Şifre belirleme işlemi başarısız oldu.");
      }
    } catch (err) {
      setError("Hata oluştu! Link süresi dolmuş olabilir.");
    }
  };

  return (
    <div className="set-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Şifre Belirle</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div className="form-group">
          <label>Yeni Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Şifreyi Onayla</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-password" type="submit">
          Şifreyi Belirle
        </button>
      </form>
    </div>
  );
}

export default SetPassword;

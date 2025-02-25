import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import All_Url from "../../url";

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
        `${All_Url.api_base_url}/external-academic/set-password`,
        { token, password }
      );

      if (response.status === 200) {
        setSuccess(
          "Şifreniz başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz..."
        );
        setTimeout(() => navigate("/"), 3000);
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
        <div>
          <label>Yeni Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifreyi Onayla</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Şifreyi Belirle</button>
      </form>
    </div>
  );
}

export default SetPassword;

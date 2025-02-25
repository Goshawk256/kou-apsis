import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Logo from "../assets/unnamed.png";

function Login() {
  const handleRegister = async () => {};

  return (
    <div className="main-login">
      <div className="login-form">
        <form onSubmit={handleRegister()}>
          <img style={{ width: "30%" }} src={Logo} alt="" />
          <h2 style={{ color: "white" }}>Kou Apsıs</h2>
          <div className="form-group">
            <label htmlFor="username">Eposta</label>
            <input className="input-login" type="text" id="username" required />
          </div>
          <button className="submit-button-login" type="submit">
            Devam Et
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

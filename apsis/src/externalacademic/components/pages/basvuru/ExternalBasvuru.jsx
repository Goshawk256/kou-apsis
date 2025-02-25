import React from "react";
import { useState } from "react";
import "./ExternalBasvuru.css";
import MyApplications from "./myapplications/MyApplications";

function ExternalBasvuru() {
  const [isMyApplications, setIsMyApplications] = useState(true);
  return (
    <div className="main-externalbasvuru">
      {isMyApplications ? <MyApplications /> : <div>Diğer Başvurular</div>}
    </div>
  );
}

export default ExternalBasvuru;

import React, { useState } from "react";
import "./ExternalBasvuru.css";
import MyApplications from "./myapplications/MyApplications";
import ConfirmBasvuru from "./confirmbasvuru/ConfirmBasvuru";

function ExternalBasvuru() {
  const [component, setComponent] = useState("myapplications");

  const renderComponent = () => {
    switch (component) {
      case "myapplications":
        return <MyApplications setComponent={setComponent} />;
      case "confirmbasvuru":
        return <ConfirmBasvuru setComponent={setComponent} />;
      default:
        return <MyApplications />;
    }
  };

  return <div className="main-externalbasvuru">{renderComponent()}</div>;
}

export default ExternalBasvuru;

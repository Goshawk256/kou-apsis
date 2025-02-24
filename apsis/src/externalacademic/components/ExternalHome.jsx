import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExternalHeader from "./header/ExternalHeader";
import ExternalSidebar from "./sidebar/ExternalSidebar";
import Makale from "./pages/makale/Makale";
import Dersler from "./pages/ders/Ders";
import Tezler from "./pages/tez/Tez";
import Projeler from "./pages/proje/Proje";
import Oduller from "./pages/odul/Odul";
import SanatsalFaaliyetler from "./pages/sanatsal/SanatsalFaaliyetler";

function ExternalHome() {
  const [selectedPage, setSelectedPage] = useState("Makaleler");

  const renderContent = () => {
    switch (selectedPage) {
      case "Makaleler":
        return <Makale />;
      case "Dersler":
        return <Dersler />;
      case "Tezler":
        return <Tezler />;
      case "Projeler":
        return <Projeler />;
      case "Ödüller":
        return <Oduller />;
      case "Sanatsal Faaliyetler":
        return <SanatsalFaaliyetler />;
      default:
        return <Makale />;
    }
  };

  return (
    <div className="main-homepage">
      <ExternalHeader />
      <ExternalSidebar onSelect={setSelectedPage} />
      <div className="flexible-component">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPage}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExternalHome;

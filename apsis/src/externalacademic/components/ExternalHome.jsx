import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExternalHeader from "./header/ExternalHeader";
import ExternalSidebar from "./sidebar/ExternalSidebar";
import Makale from "./pages/makale/Makale";

function ExternalHome() {
  const [selectedPage, setSelectedPage] = useState("Makaleler");

  const renderContent = () => {
    switch (selectedPage) {
      case "Makaleler":
        return <Makale />;
      case "Yönetilen Tezler":
        return <div>Yönetilen Tezler</div>;
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

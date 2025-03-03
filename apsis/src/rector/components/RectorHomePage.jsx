import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RectorHeader from "./header/RectorHeader";
import RectorSidebar from "./sidebar/RectorSidebar";
import RectorAna from "./pages/anasayfa/RectorAna";
import Juries from "./pages/juries/Juries";
import Lists from "./pages/lists/Lists";
import Faculties from "./pages/faculties/Faculties";
import Applications from "./pages/applications/Applications";

function RectorHomePage() {
  const [selectedPage, setSelectedPage] = useState("Ana Sayfa");

  const renderContent = () => {
    switch (selectedPage) {
      case "Ana Sayfa":
        return <RectorAna />;
      case "Başvurular":
        return <Applications />;
      case "Ön Değerlendirme Jürileri":
        return <Juries />;
      case "Fakülteler":
        return <Faculties />;
      case "İlanlar":
        return <Lists />;
      default:
        return <RectorAna />;
    }
  };

  return (
    <div className="main-homepage">
      <RectorHeader />
      <RectorSidebar onSelect={setSelectedPage} />
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

export default RectorHomePage;

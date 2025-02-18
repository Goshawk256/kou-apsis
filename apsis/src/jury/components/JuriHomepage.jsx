import  {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JuriHeader from './header/JuriHeader'
import JuriSidebar from './sidebar/JuriSidebar'
import JuriAna from './pages/anasayfa/JuriAna';
import BasvuruDetay from './pages/basvurudetay/BasvuruDetay';


function JuriHomepage() {
    const [selectedPage, setSelectedPage] = useState('Ana Sayfa');




    const renderContent = () => {
        switch (selectedPage) {
            case 'Ana Sayfa':
                return <JuriAna onSelect={setSelectedPage} />;
            case 'Basvurudetay':
                return <BasvuruDetay onSelect={setSelectedPage} />;
            default:
                return <JuriAna />;
        }
    };

    return (

        <div className="main-homepage">
            <JuriHeader />
            <JuriSidebar onSelect={setSelectedPage} />
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

export default JuriHomepage;

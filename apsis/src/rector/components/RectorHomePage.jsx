import  {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RectorHeader from './header/RectorHeader'
import RectorSidebar from './sidebar/RectorSidebar'




function RectorHomePage() {
    const [selectedPage, setSelectedPage] = useState('Ana Sayfa');




    const renderContent = () => {
        switch (selectedPage) {
            case 'Ana Sayfa':
                return <div>rector ana sayfa</div>;
            case 'Mesajlar':
                return <div>rector mesajlar</div>;
            case 'Jüriler':
                return <div>rector jüriler</div>;
            case 'Fakülteler':
                return <div>rector fakülteler</div>;
            default:
                return <div>rector ana sayfa</div>;
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

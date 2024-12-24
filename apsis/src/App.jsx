import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './home/HomePage';
import Login from './components/login/Login';
import Header from './components/header/Header';
import { ThemeProvider, useTheme } from './theme/themeContext';
import { useEffect } from 'react';

function App() {
  return (
    <ThemeProvider>

      <Router>
        <ThemedApp />
      </Router>
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();
  const location = useLocation();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={theme}>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            }
          />
          <Route
            path="/home"
            element={
              <AnimatedPage>
                <HomePage />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default App;

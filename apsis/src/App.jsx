import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import Login from './components/login/Login';
import Header from './components/header/Header';
import { ThemeProvider, useTheme } from './theme/themeContext';
import { useEffect } from 'react';
import Finish from './components/finish/Finish';

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();  // Tema bilgisi burada alınacak
  useEffect(() => {
    document.body.className = theme; // body'ye tema sınıfını ekle
  }, [theme]);
  return (
    <div className={theme}> {/* Burada temayı kullanıyoruz */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

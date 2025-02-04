import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import Login from './components/login/Login';
import Header from './components/header/Header';


import Finish from './components/finish/Finish';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </Router>
  );
}



export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import Login from './components/login/Login';

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Ana Route */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />


        </Routes>
      </Router>
    </>
  )
}

export default App

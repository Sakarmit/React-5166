import './App.css';
import { useState } from 'react';

import LoginPage from './LoginPage/LoginPage';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import ReportPage from './ReportPage/ReportPage';
import SummaryPage from './SummaryPage/SummaryPage';
import Footer from './Footer/Footer';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState('');

  return (
    <BrowserRouter>
      {!loggedIn && <Navigate to="/login" />}
      <Header isLoggedIn={loggedIn} setIsLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/login" element={<LoginPage isLoggedIn={loggedIn} setIsLoggedIn={setLoggedIn} />}/>
        <Route path="/summary" element={<SummaryPage setIsLoggedIn={setLoggedIn} />}/>
        <Route path="/report" element={<ReportPage setIsLoggedIn={setLoggedIn} />}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

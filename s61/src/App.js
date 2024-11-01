import './App.css';

import LoginPage from './LoginPage/LoginPage';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import ReportPage from './ReportPage/ReportPage';
import SummaryPage from './SummaryPage/SummaryPage';
import Footer from './Footer/Footer';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/summary" element={<SummaryPage/>}/>
        <Route path="/report" element={<ReportPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

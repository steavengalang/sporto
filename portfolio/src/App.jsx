import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import EasterEgg from './components/EasterEgg';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="dev-grid">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
          <EasterEgg />
          <div className="scanline"></div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

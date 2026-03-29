import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import OAuthCallback from './pages/OAuthCallback';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content" style={{ minHeight: 'calc(100vh - 70px)' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/oauth2/callback" element={<OAuthCallback />} />
          {/* We will add routes for /hotels/:id, /booking, /profile, /admin soon */}
        </Routes>
      </main>
    </>
  );
}

export default App;

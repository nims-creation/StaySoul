import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar glass-nav">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          Stay<span className="text-gold">Soul</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/search" className="nav-item">
            <Search size={18} />
            Explore
          </Link>
          <a href="#about" className="nav-item">Collection</a>
          <a href="#experiences" className="nav-item">Experiences</a>
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Welcome, {user.name || 'Guest'}</span>
              <button onClick={() => navigate('/profile')} className="icon-btn" title="Profile">
                <User size={20} />
              </button>
              <button onClick={handleLogout} className="icon-btn text-danger" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-item">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

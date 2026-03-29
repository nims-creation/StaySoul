import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleOAuthCallback(token).then(() => {
        navigate('/');
      });
    } else {
      navigate('/login');
    }
  }, [searchParams, handleOAuthCallback, navigate]);

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ border: '3px solid transparent', borderTopColor: 'var(--accent-gold)', borderRadius: '50%', width: '40px', height: '40px' }}
      />
      <span style={{ marginLeft: '1rem', color: 'var(--accent-gold)' }}>Authenticating securely...</span>
    </div>
  );
};

export default OAuthCallback;

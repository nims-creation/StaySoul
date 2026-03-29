import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Star, Shield, ArrowRight } from 'lucide-react';
import './Landing.css';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="hero-text"
          >
            <motion.h1 variants={fadeIn}>
              Extraordinary stays for <br/>
              <span className="text-gold">extraordinary moments</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="hero-subtitle">
              Discover breathtaking properties worldwide with intelligent pricing that ensures you get the best value for your perfect getaway.
            </motion.p>
            <motion.div variants={fadeIn} className="hero-cta">
              <Link to="/search" className="btn btn-primary btn-large">
                Start Exploring <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-16">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2 className="section-title">Why choose Stay<span className="text-gold">Soul</span></h2>
            <p className="text-secondary">Experience the next generation of hospitality</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="features-grid"
          >
            <motion.div variants={fadeIn} className="feature-card glass">
              <div className="feature-icon icon-gold">
                <Compass size={32} />
              </div>
              <h3>Curated Collections</h3>
              <p className="text-secondary">Every property is hand-picked to meet our rigorous standards for design, comfort, and service.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="feature-card glass">
              <div className="feature-icon icon-gold">
                <Star size={32} />
              </div>
              <h3>Dynamic Value</h3>
              <p className="text-secondary">Our intelligent pricing AI ensures transparent rates that adapt to give you the absolute best value.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="feature-card glass">
              <div className="feature-icon icon-gold">
                <Shield size={32} />
              </div>
              <h3>Secure & Seamless</h3>
              <p className="text-secondary">From one-click Google login to encrypted Stripe payments, your entire journey is frictionless.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="glass-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Stay<span className="text-gold">Soul</span></h3>
              <p className="text-secondary mt-1">Elevating hospitality.</p>
            </div>
            <div className="footer-links text-secondary">
              © 2026 StaySoul. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

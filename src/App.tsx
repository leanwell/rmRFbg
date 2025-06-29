import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import FileUpload from './components/FileUpload';
import ThemeToggle from './components/ThemeToggle';
import favicon from './assets/favicon.png';
import './styles/global.css';
import './styles/light.css';
import './styles/dark.css';

function App() {
  const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = favicon;
    const existingLinks = document.querySelectorAll('link[rel~="icon"]');
    existingLinks.forEach(el => el.remove());
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container"
          onAnimationComplete={() => setIsMounted(true)}
        >
          <header>

            <h1>rmRF<span>bg</span></h1>
            <p>Remove image backgrounds in one click</p>
          </header>
          {isMounted && <FileUpload />}
        </motion.div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; leanwell {new Date().getFullYear()}</p>
        </div>
      </footer>


      </div>
    </ThemeProvider>
  );
}

export default App;
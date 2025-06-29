import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import FileUpload from './components/FileUpload';
import ThemeToggle from './components/ThemeToggle';
import './styles/global.css';
import './styles/light.css';
import './styles/dark.css';

function App() {
  const [isMounted, setIsMounted] = useState(false);

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
      </div>
    </ThemeProvider>
  );
}

export default App;
import './App.css';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-shell relative">
      <CustomCursor />

      {/* Scroll Progress Bar for high-end feel */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50 rounded-r-full"
        style={{ scaleX }}
      />

      <header className="topbar">
        <a className="brand hover-trigger" href="#home">
          신연준 Portfolio
        </a>
        <nav className="nav">
          <a href="#projects" className="hover-trigger relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="https://github.com/shinyeonjun"
            target="_blank"
            rel="noreferrer"
            className="hover-trigger relative group"
          >
            GitHub
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <Projects />
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a
            href="https://github.com/shinyeonjun"
            target="_blank"
            rel="noreferrer"
            className="hover-trigger footer-link"
          >
            GitHub
          </a>
          <a
            href="mailto:sinyeonjun@gmail.com"
            className="hover-trigger footer-link"
          >
            sinyeonjun@gmail.com
          </a>
        </div>
        <p>© 2026 Developer Portfolio. All rights reserved.</p>
        <p className="footer-quote">"Directing data, architecting flows."</p>
      </footer>
    </div>
  );
}

export default App;

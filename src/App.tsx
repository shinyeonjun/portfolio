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
    <div className="app-shell">
      <CustomCursor />

      {/* 스크롤 진행률 표시 */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <header className="topbar">
        <a className="brand hover-trigger" href="#home">
          신연준 Portfolio
        </a>
        <nav className="nav">
          <a href="#projects" className="hover-trigger nav-link">
            Projects
            <span className="nav-link-line" />
          </a>
          <a
            href="https://github.com/shinyeonjun"
            target="_blank"
            rel="noreferrer"
            className="hover-trigger nav-link"
          >
            GitHub
            <span className="nav-link-line nav-link-line-muted" />
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

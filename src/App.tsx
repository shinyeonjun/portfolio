import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.css';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectsTimeline from './components/ProjectsTimeline';
import QuickNav from './components/QuickNav';

type PortfolioView = 'classic' | 'timeline';

function readPortfolioView(): PortfolioView {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'timeline' ? 'timeline' : 'classic';
}

export default function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const [view, setView] = useState<PortfolioView>(() => readPortfolioView());

    useEffect(() => {
        const handlePopState = () => setView(readPortfolioView());

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleChangeView = (nextView: PortfolioView) => {
        if (view === nextView) {
            return;
        }

        const url = new URL(window.location.href);

        if (nextView === 'timeline') {
            url.searchParams.set('view', 'timeline');
        } else {
            url.searchParams.delete('view');
        }

        url.hash = '';
        window.history.pushState({}, '', `${url.pathname}${url.search}`);
        window.scrollTo({ top: 0, behavior: 'auto' });
        setView(nextView);
    };

    const isTimelineView = view === 'timeline';

    return (
        <div className={`app-shell${isTimelineView ? ' is-timeline-view' : ''}`}>
            <CustomCursor />
            {!isTimelineView && <QuickNav />}

            <motion.div className="scroll-progress" style={{ scaleX }} />

            <header className="topbar">
                <a className="brand hover-trigger" href="#home">
                    신연준 Portfolio
                </a>

                <div className="topbar-actions">
                    <div className="view-switch" role="tablist" aria-label="포트폴리오 비교 보기">
                        <button
                            type="button"
                            className={`view-switch-button hover-trigger${!isTimelineView ? ' is-active' : ''}`}
                            aria-selected={!isTimelineView}
                            onClick={() => handleChangeView('classic')}
                        >
                            Classic
                        </button>
                        <button
                            type="button"
                            className={`view-switch-button hover-trigger${isTimelineView ? ' is-active' : ''}`}
                            aria-selected={isTimelineView}
                            onClick={() => handleChangeView('timeline')}
                        >
                            Timeline Lab
                        </button>
                    </div>

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
                </div>
            </header>

            <main>
                <Hero />
                {isTimelineView ? <ProjectsTimeline /> : <Projects />}
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
                    <a href="mailto:sinyeonjun@gmail.com" className="hover-trigger footer-link">
                        sinyeonjun@gmail.com
                    </a>
                </div>
                <p>© 2026 Developer Portfolio. All rights reserved.</p>
                <p className="footer-quote">"Directing data, architecting flows."</p>
            </footer>
        </div>
    );
}

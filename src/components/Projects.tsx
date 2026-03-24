import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from './projectData';

const staggerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
            ease: 'easeOut',
        },
    },
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function Projects() {
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
    const lightboxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lightbox) {
            lightboxRef.current?.focus();
        }
    }, [lightbox]);

    return (
        <>
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        ref={lightboxRef}
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setLightbox(null)}
                        onKeyDown={(event) => event.key === 'Escape' && setLightbox(null)}
                        tabIndex={0}
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.img
                            src={lightbox.src}
                            alt={lightbox.alt}
                            className="lightbox-image"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            onClick={(event) => event.stopPropagation()}
                        />
                        <span className="lightbox-caption">{lightbox.alt}</span>
                        <button
                            aria-label="이미지 닫기"
                            className="lightbox-close"
                            onClick={() => setLightbox(null)}
                            type="button"
                        >
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="section" id="projects">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="eyebrow">Selected Works</p>
                    <h2>핵심 프로젝트</h2>
                </motion.div>

                {projects.map((project) => (
                    <motion.article
                        className="project-section"
                        id={project.id}
                        key={project.id}
                        variants={staggerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-150px' }}
                    >
                        <motion.div className="project-head" variants={childVariants}>
                            <div className="project-copy">
                                <div className="project-meta">
                                    <span className="project-period">{project.period}</span>
                                    <span
                                        className={`project-badge ${project.isTeam ? 'team' : 'personal'}`}
                                    >
                                        {project.isTeam ? 'Team Project' : 'Personal'}
                                    </span>
                                </div>
                                <h3>{project.title}</h3>
                                <p className="project-summary">{project.summary}</p>
                            </div>
                            <div className="project-links">
                                {project.links.map((link) => (
                                    <a
                                        className="project-link hover-trigger"
                                        href={link.href}
                                        key={`${project.id}-${link.label}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.icon === 'external' ? (
                                            <ExternalLink size={18} style={{ marginRight: '0.5rem' }} />
                                        ) : (
                                            <Github size={18} style={{ marginRight: '0.5rem' }} />
                                        )}
                                        <span>{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="meta-row" variants={childVariants}>
                            <div className="meta-block">
                                <span className="meta-label">Role</span>
                                <p>{project.role}</p>
                            </div>
                            <div className="meta-block">
                                <span className="meta-label">Tech Stack</span>
                                <div className="stack-row">
                                    {project.stack.map((item) => (
                                        <span className="stack-chip" key={item}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="highlight-row" variants={childVariants}>
                            {project.highlights.map((item) => (
                                <div className="highlight-chip" key={item}>
                                    {item}
                                </div>
                            ))}
                        </motion.div>

                        <motion.div className="project-grid-full" variants={childVariants}>
                            <section className="panel">
                                <div className="panel-head">
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        실제 구동 화면 <ExternalLink size={14} />
                                    </h4>
                                    <span>Screenshots</span>
                                </div>

                                <div className="screenshots-body">
                                    <div className={`visual-grid visual-grid-${project.visuals.length}`}>
                                        {project.visuals.map((visual) => (
                                            <figure className="visual-card" key={visual.alt}>
                                                <div className="browser-bar">
                                                    <div className="browser-dot" style={{ background: '#ff5f57' }} />
                                                    <div className="browser-dot" style={{ background: '#febc2e' }} />
                                                    <div className="browser-dot" style={{ background: '#28c840' }} />
                                                    <span className="browser-url">{visual.alt}</span>
                                                </div>
                                                <img
                                                    src={visual.src}
                                                    alt={visual.alt}
                                                    onClick={() => setLightbox(visual)}
                                                />
                                            </figure>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </motion.div>

                        <motion.div className="artifact-grid" variants={childVariants}>
                            {project.artifacts.map((artifact) => (
                                <section className="panel artifact-panel" key={artifact.name}>
                                    <div className="panel-head">
                                        <h4>{artifact.name}</h4>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                            {artifact.src ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                    {artifact.src ? (
                                        <img
                                            src={artifact.src}
                                            alt={artifact.name}
                                            style={{
                                                width: '100%',
                                                height: '14rem',
                                                objectFit: 'contain',
                                                background: '#f8fafc',
                                                padding: '1rem',
                                                cursor: 'zoom-in',
                                            }}
                                            onClick={() =>
                                                setLightbox({ src: artifact.src as string, alt: artifact.name })
                                            }
                                        />
                                    ) : (
                                        <div className="artifact-placeholder">다이어그램 영역</div>
                                    )}
                                </section>
                            ))}
                        </motion.div>
                    </motion.article>
                ))}
            </section>
        </>
    );
}

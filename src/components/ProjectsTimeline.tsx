import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { timelineProjects } from './projectData';

const timelineVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
};

export default function ProjectsTimeline() {
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
    const [openProjectId, setOpenProjectId] = useState<string>(timelineProjects[0]?.id ?? '');
    const [activeProjectId, setActiveProjectId] = useState<string>(timelineProjects[0]?.id ?? '');
    const lightboxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lightbox) {
            lightboxRef.current?.focus();
        }
    }, [lightbox]);

    useEffect(() => {
        const sections = timelineProjects
            .map((project) => document.getElementById(project.id))
            .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) {
            return undefined;
        }

        const updateActiveProject = () => {
            const activationLine = window.innerHeight * 0.34;
            const candidates = sections
                .map((section) => ({
                    id: section.id,
                    top: section.getBoundingClientRect().top,
                }))
                .filter((section) => section.top <= activationLine)
                .sort((a, b) => b.top - a.top);

            if (candidates[0]) {
                setActiveProjectId(candidates[0].id);
                return;
            }

            setActiveProjectId(sections[0].id);
        };

        updateActiveProject();
        window.addEventListener('scroll', updateActiveProject, { passive: true });
        window.addEventListener('resize', updateActiveProject);

        return () => {
            window.removeEventListener('scroll', updateActiveProject);
            window.removeEventListener('resize', updateActiveProject);
        };
    }, []);

    const handleToggleProject = (projectId: string) => {
        setOpenProjectId((currentId) => (currentId === projectId ? '' : projectId));
        setActiveProjectId(projectId);
    };

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

            <section className="section timeline-section" id="projects">
                <motion.div
                    className="section-header timeline-section-header"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="eyebrow">Timeline Lab</p>
                    <h2>프로젝트 여정</h2>
                    <p className="timeline-intro">
                        시간순으로 정거장을 지나가듯 훑어보고, 필요한 프로젝트만 멈춰서 자세히
                        보는 비교용 실험 페이지
                    </p>
                </motion.div>

                <div className="timeline-layout">
                    <aside className="timeline-rail">
                        <div className="timeline-rail-card">
                            <span className="timeline-rail-label">Route Map</span>
                            <strong className="timeline-rail-range">2025 → 2026</strong>
                            <p className="timeline-rail-note">
                                정거장을 누르면 해당 프로젝트가 펼쳐집니다.
                            </p>
                            <div className="timeline-stop-list">
                                {timelineProjects.map((project, index) => {
                                    const isActive = activeProjectId === project.id;

                                    return (
                                        <a
                                            key={project.id}
                                            href={`#${project.id}`}
                                            className={`timeline-stop hover-trigger${isActive ? ' is-active' : ''}`}
                                            aria-current={isActive ? 'page' : undefined}
                                            onClick={() => {
                                                setActiveProjectId(project.id);
                                                setOpenProjectId(project.id);
                                            }}
                                        >
                                            <span className="timeline-stop-marker" />
                                            <span className="timeline-stop-index">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="timeline-stop-copy">
                                                <strong>{project.title}</strong>
                                                <small>{project.period}</small>
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    <div className="timeline-main">
                        {timelineProjects.map((project, index) => {
                            const isOpen = openProjectId === project.id;
                            const isActive = activeProjectId === project.id;

                            return (
                                <motion.article
                                    className={`timeline-project${isActive ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
                                    id={project.id}
                                    key={project.id}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: '-150px' }}
                                    variants={timelineVariants}
                                >
                                    <span className="timeline-project-node" />
                                    <div className="timeline-card-shell">
                                        <div className="timeline-card-head">
                                            <div className="timeline-card-top">
                                                <div className="timeline-card-route">
                                                    <span className="timeline-card-order">
                                                        Stop {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="project-period timeline-project-period">
                                                        {project.period}
                                                    </span>
                                                    <span
                                                        className={`project-badge ${project.isTeam ? 'team' : 'personal'}`}
                                                    >
                                                        {project.isTeam ? 'Team Project' : 'Personal'}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className={`timeline-toggle hover-trigger${isOpen ? ' is-open' : ''}`}
                                                    aria-expanded={isOpen}
                                                    aria-controls={`${project.id}-details`}
                                                    onClick={() => handleToggleProject(project.id)}
                                                >
                                                    <span>{isOpen ? '정차 종료' : '정차해서 보기'}</span>
                                                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>
                                            </div>

                                            <div className="timeline-title-row">
                                                <h3>{project.title}</h3>
                                                <div className="project-links timeline-links">
                                                    {project.links.map((link) => (
                                                        <a
                                                            className="project-link hover-trigger"
                                                            href={link.href}
                                                            key={`${project.id}-${link.label}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {link.icon === 'external' ? (
                                                                <ExternalLink
                                                                    size={18}
                                                                    style={{ marginRight: '0.5rem' }}
                                                                />
                                                            ) : (
                                                                <Github
                                                                    size={18}
                                                                    style={{ marginRight: '0.5rem' }}
                                                                />
                                                            )}
                                                            <span>{link.label}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="project-summary timeline-summary">
                                                {project.summary}
                                            </p>

                                            <div className="highlight-row timeline-highlight-row">
                                                {project.highlights.map((item) => (
                                                    <div className="highlight-chip" key={item}>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    id={`${project.id}-details`}
                                                    className="timeline-card-body"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                                                >
                                                    <div className="timeline-card-body-inner">
                                                        <div className="meta-row timeline-meta-row">
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
                                                        </div>

                                                        <div className="project-grid-full timeline-visuals">
                                                            <section className="panel">
                                                                <div className="panel-head">
                                                                    <h4
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '0.5rem',
                                                                        }}
                                                                    >
                                                                        실제 구동 화면 <ExternalLink size={14} />
                                                                    </h4>
                                                                    <span>Screenshots</span>
                                                                </div>

                                                                <div className="screenshots-body">
                                                                    <div
                                                                        className={`visual-grid visual-grid-${project.visuals.length}`}
                                                                    >
                                                                        {project.visuals.map((visual) => (
                                                                            <figure
                                                                                className="visual-card"
                                                                                key={visual.alt}
                                                                            >
                                                                                <div className="browser-bar">
                                                                                    <div
                                                                                        className="browser-dot"
                                                                                        style={{
                                                                                            background: '#ff5f57',
                                                                                        }}
                                                                                    />
                                                                                    <div
                                                                                        className="browser-dot"
                                                                                        style={{
                                                                                            background: '#febc2e',
                                                                                        }}
                                                                                    />
                                                                                    <div
                                                                                        className="browser-dot"
                                                                                        style={{
                                                                                            background: '#28c840',
                                                                                        }}
                                                                                    />
                                                                                    <span className="browser-url">
                                                                                        {visual.alt}
                                                                                    </span>
                                                                                </div>
                                                                                <img
                                                                                    src={visual.src}
                                                                                    alt={visual.alt}
                                                                                    onClick={() =>
                                                                                        setLightbox(visual)
                                                                                    }
                                                                                />
                                                                            </figure>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>

                                                        <div className="artifact-grid timeline-artifacts">
                                                            {project.artifacts.map((artifact) => (
                                                                <section
                                                                    className="panel artifact-panel"
                                                                    key={artifact.name}
                                                                >
                                                                    <div className="panel-head">
                                                                        <h4>{artifact.name}</h4>
                                                                        <span
                                                                            style={{
                                                                                fontSize: '0.7rem',
                                                                                textTransform: 'uppercase',
                                                                            }}
                                                                        >
                                                                            {artifact.src
                                                                                ? 'Completed'
                                                                                : 'Pending'}
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
                                                                                setLightbox({
                                                                                    src: artifact.src as string,
                                                                                    alt: artifact.name,
                                                                                })
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div className="artifact-placeholder">
                                                                            다이어그램 영역
                                                                        </div>
                                                                    )}
                                                                </section>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Project } from './projectData';
import ProjectsTimelineSkeleton from './ProjectsTimelineSkeleton';

type LightboxState = {
    src: string;
    alt: string;
} | null;

export default function ProjectsTimeline() {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [lightbox, setLightbox] = useState<LightboxState>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lightboxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let cancelled = false;

        import('./projectData')
            .then((module) => {
                if (cancelled) {
                    return;
                }

                setProjects(module.timelineProjects);
            })
            .catch(() => {
                if (!cancelled) {
                    setProjects([]);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (lightbox) {
            lightboxRef.current?.focus();
        }
    }, [lightbox]);

    useEffect(() => {
        if (!projects?.length) {
            return;
        }

        const syncFromHash = (scrollToProjects: boolean) => {
            const hashId = decodeURIComponent(window.location.hash.replace('#', ''));

            if (!hashId) {
                return;
            }

            const targetIndex = projects.findIndex((project) => project.id === hashId);

            if (targetIndex < 0) {
                return;
            }

            setActiveIndex(targetIndex);

            if (scrollToProjects) {
                document.getElementById('projects')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        };

        syncFromHash(true);

        const handleHashChange = () => {
            syncFromHash(true);
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [projects]);

    const goToProject = (index: number) => {
        if (!projects?.length) {
            return;
        }

        const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));
        const nextProject = projects[clampedIndex];

        setActiveIndex(clampedIndex);

        if (window.location.hash !== `#${nextProject.id}`) {
            window.history.replaceState(null, '', `#${nextProject.id}`);
        }
    };

    if (!projects) {
        return <ProjectsTimelineSkeleton />;
    }

    if (!projects.length) {
        return (
            <section className="section growth-section" id="projects">
                <div className="section-header growth-section-header">
                    <p className="eyebrow">Projects</p>
                    <h2>프로젝트 데이터를 불러오지 못했습니다.</h2>
                    <p className="growth-intro">잠시 후 다시 새로고침해 주세요.</p>
                </div>
            </section>
        );
    }

    const activeProject = projects[activeIndex] ?? projects[0];
    const primaryVisual = activeProject.visuals[0];
    const supportingVisuals = activeProject.visuals.slice(1);

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

            <section className="section growth-section" id="projects">
                <motion.div
                    className="section-header growth-section-header"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="eyebrow">Projects</p>
                    <h2>시간순 프로젝트</h2>
                    <p className="growth-intro">
                        프로젝트를 시간순으로 정리했습니다. 위쪽 타임라인에서 단계를 고르면,
                        아래 상세 카드가 바뀌는 구조입니다. 흐름은 유지하고, 읽는 경험은 데스크톱
                        기준으로 안정적으로 가져가도록 정리했습니다.
                    </p>
                </motion.div>

                <div className="growth-shell">
                    <div className="growth-timeline-nav">
                        <div className="growth-timeline-head">
                            <div className="growth-control-status">
                                <span>Timeline Order</span>
                                <strong>
                                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                                    {String(projects.length).padStart(2, '0')}
                                </strong>
                            </div>
                        </div>

                        <div className="growth-progress" aria-label="시간순 프로젝트 목록">
                            {projects.map((project, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <button
                                        key={project.id}
                                        id={project.id}
                                        type="button"
                                        className={`growth-progress-item hover-trigger${isActive ? ' is-active' : ''}`}
                                        onClick={() => goToProject(index)}
                                        aria-current={isActive ? 'step' : undefined}
                                        aria-controls="project-detail-panel"
                                    >
                                        <span className="growth-progress-dot" />
                                        <span className="growth-progress-copy">
                                            <small>
                                                Phase {String(index + 1).padStart(2, '0')}
                                            </small>
                                            <strong>{project.title}</strong>
                                            <em>{project.period}</em>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="growth-stage">
                        <div className="growth-stage-arrows" aria-label="프로젝트 이동">
                            <button
                                type="button"
                                className="growth-control growth-control-floating hover-trigger"
                                onClick={() => goToProject(activeIndex - 1)}
                                disabled={activeIndex === 0}
                                aria-label="이전 프로젝트"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                className="growth-control growth-control-floating hover-trigger"
                                onClick={() => goToProject(activeIndex + 1)}
                                disabled={activeIndex === projects.length - 1}
                                aria-label="다음 프로젝트"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.article
                                key={activeProject.id}
                                className="growth-slide is-active"
                                id="project-detail-panel"
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.28, ease: 'easeOut' }}
                            >
                                <div className="growth-slide-card">
                                    <div className="growth-slide-copy">
                                        <div className="growth-slide-top">
                                            <div className="growth-slide-meta">
                                                <div className="growth-slide-meta-top">
                                                    <span className="growth-slide-order">
                                                        Phase {String(activeIndex + 1).padStart(2, '0')}
                                                    </span>
                                                    <span
                                                        className={`project-badge ${activeProject.isTeam ? 'team' : 'personal'}`}
                                                    >
                                                        {activeProject.isTeam ? 'Team' : 'Personal'}
                                                    </span>
                                                </div>
                                                <span className="project-period growth-slide-period">
                                                    {activeProject.period}
                                                </span>
                                            </div>

                                            <div className="project-links growth-slide-links">
                                                {activeProject.links.map((link) => (
                                                    <a
                                                        className="project-link hover-trigger"
                                                        href={link.href}
                                                        key={`${activeProject.id}-${link.label}`}
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

                                        <div className="growth-slide-title-row">
                                            <div>
                                                <h3>{activeProject.title}</h3>
                                                <p className="project-summary growth-slide-summary">
                                                    {activeProject.summary}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="highlight-row growth-highlight-row">
                                            {activeProject.highlights.map((item) => (
                                                <div className="highlight-chip" key={item}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="growth-role-block">
                                            <span className="meta-label">Role</span>
                                            <p>{activeProject.role}</p>
                                        </div>

                                        <div className="growth-stack-block">
                                            <span className="meta-label">Tech Stack</span>
                                            <div className="stack-row">
                                                {activeProject.stack.map((item) => (
                                                    <span className="stack-chip" key={item}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="growth-slide-visuals">
                                        <button
                                            type="button"
                                            className="growth-primary-visual hover-trigger"
                                            onClick={() => setLightbox(primaryVisual)}
                                        >
                                            <div className="browser-bar">
                                                <div
                                                    className="browser-dot"
                                                    style={{ background: '#ff5f57' }}
                                                />
                                                <div
                                                    className="browser-dot"
                                                    style={{ background: '#febc2e' }}
                                                />
                                                <div
                                                    className="browser-dot"
                                                    style={{ background: '#28c840' }}
                                                />
                                                <span className="browser-url">{primaryVisual.alt}</span>
                                            </div>
                                            <img
                                                src={primaryVisual.src}
                                                alt={primaryVisual.alt}
                                                className="growth-primary-image"
                                                loading={activeIndex === 0 ? 'eager' : 'lazy'}
                                                decoding="async"
                                            />
                                        </button>

                                        {supportingVisuals.length > 0 && (
                                            <div className="growth-support-visuals">
                                                {supportingVisuals.map((visual) => (
                                                    <button
                                                        type="button"
                                                        className="growth-support-card hover-trigger"
                                                        key={visual.alt}
                                                        onClick={() => setLightbox(visual)}
                                                    >
                                                        <img
                                                            src={visual.src}
                                                            alt={visual.alt}
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                        <span>{visual.alt}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="growth-artifact-strip">
                                            {activeProject.artifacts.map((artifact) => (
                                                <button
                                                    type="button"
                                                    className="growth-artifact-card hover-trigger"
                                                    key={artifact.name}
                                                    onClick={() =>
                                                        artifact.src
                                                            ? setLightbox({
                                                                  src: artifact.src,
                                                                  alt: artifact.name,
                                                              })
                                                            : undefined
                                                    }
                                                >
                                                    <div className="growth-artifact-head">
                                                        <strong>{artifact.name}</strong>
                                                        <span>Reference</span>
                                                    </div>
                                                    {artifact.src ? (
                                                        <img
                                                            src={artifact.src}
                                                            alt={artifact.name}
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    ) : (
                                                        <div className="artifact-placeholder">
                                                            다이어그램 영역
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </>
    );
}

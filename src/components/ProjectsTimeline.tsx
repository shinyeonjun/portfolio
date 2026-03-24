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
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<Array<HTMLElement | null>>([]);

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

        const slider = sliderRef.current;

        if (!slider) {
            return;
        }

        const handleScroll = () => {
            const nextIndex = Math.round(slider.scrollLeft / slider.clientWidth);
            setActiveIndex((currentIndex) =>
                currentIndex === nextIndex ? currentIndex : nextIndex,
            );
        };

        handleScroll();
        slider.addEventListener('scroll', handleScroll, { passive: true });

        return () => slider.removeEventListener('scroll', handleScroll);
    }, [projects]);

    useEffect(() => {
        if (!projects?.length) {
            return;
        }

        const hashId = window.location.hash.replace('#', '');

        if (!hashId) {
            return;
        }

        const targetIndex = projects.findIndex((project) => project.id === hashId);

        if (targetIndex >= 0) {
            requestAnimationFrame(() => {
                slideRefs.current[targetIndex]?.scrollIntoView({
                    behavior: 'auto',
                    block: 'nearest',
                    inline: 'start',
                });
                setActiveIndex(targetIndex);
            });
        }
    }, [projects]);

    const goToSlide = (index: number) => {
        if (!projects?.length) {
            return;
        }

        const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));
        slideRefs.current[clampedIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });
        setActiveIndex(clampedIndex);
    };

    if (!projects) {
        return <ProjectsTimelineSkeleton />;
    }

    if (!projects.length) {
        return (
            <section className="section growth-section" id="projects">
                <div className="section-header growth-section-header">
                    <p className="eyebrow">Growth Flow</p>
                    <h2>프로젝트 데이터를 불러오지 못했습니다.</h2>
                    <p className="growth-intro">잠시 후 다시 새로고침해 주세요.</p>
                </div>
            </section>
        );
    }

    const activeProject = projects[activeIndex] ?? projects[0];

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
                    <p className="eyebrow">Growth Flow</p>
                    <h2>시간순 성장 흐름</h2>
                    <p className="growth-intro">
                        세로로 길게 펼치기보다, 2025에서 2026까지 어떤 프로젝트를 거치며
                        지금의 방향으로 왔는지 좌우 슬라이드로 훑어보는 메인 프로젝트
                        페이지입니다.
                    </p>
                </motion.div>

                <div className="growth-shell">
                    <div className="growth-header-row">
                        <div className="growth-progress" aria-label="프로젝트 성장 순서">
                            {projects.map((project, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <button
                                        key={project.id}
                                        type="button"
                                        className={`growth-progress-item hover-trigger${isActive ? ' is-active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                        aria-current={isActive ? 'step' : undefined}
                                    >
                                        <span className="growth-progress-dot" />
                                        <span className="growth-progress-copy">
                                            <strong>{project.title}</strong>
                                            <small>{project.period}</small>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="growth-controls">
                            <button
                                type="button"
                                className="growth-control hover-trigger"
                                onClick={() => goToSlide(activeIndex - 1)}
                                disabled={activeIndex === 0}
                                aria-label="이전 프로젝트"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="growth-control-status">
                                <span>Current Flow</span>
                                <strong>
                                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                                    {String(projects.length).padStart(2, '0')}
                                </strong>
                            </div>
                            <button
                                type="button"
                                className="growth-control hover-trigger"
                                onClick={() => goToSlide(activeIndex + 1)}
                                disabled={activeIndex === projects.length - 1}
                                aria-label="다음 프로젝트"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="growth-stage">
                        <div className="growth-slider" ref={sliderRef}>
                            {projects.map((project, index) => {
                                const primaryVisual = project.visuals[0];
                                const supportingVisuals = project.visuals.slice(1);
                                const isActive = activeIndex === index;

                                return (
                                    <article
                                        className={`growth-slide${isActive ? ' is-active' : ''}`}
                                        id={project.id}
                                        key={project.id}
                                        ref={(node) => {
                                            slideRefs.current[index] = node;
                                        }}
                                    >
                                        <div className="growth-slide-card">
                                            <div className="growth-slide-copy">
                                                <div className="growth-slide-top">
                                                    <div className="growth-slide-meta">
                                                        <div className="growth-slide-meta-top">
                                                            <span className="growth-slide-order">
                                                                Phase {String(index + 1).padStart(2, '0')}
                                                            </span>
                                                            <span
                                                                className={`project-badge ${project.isTeam ? 'team' : 'personal'}`}
                                                            >
                                                                {project.isTeam ? 'Team' : 'Personal'}
                                                            </span>
                                                        </div>
                                                        <span className="project-period growth-slide-period">
                                                            {project.period}
                                                        </span>
                                                    </div>
                                                    <div className="project-links growth-slide-links">
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

                                                <div className="growth-slide-title-row">
                                                    <div>
                                                        <h3>{project.title}</h3>
                                                        <p className="project-summary growth-slide-summary">
                                                            {project.summary}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="highlight-row growth-highlight-row">
                                                    {project.highlights.map((item) => (
                                                        <div className="highlight-chip" key={item}>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="growth-role-block">
                                                    <span className="meta-label">Role</span>
                                                    <p>{project.role}</p>
                                                </div>

                                                <div className="growth-stack-block">
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
                                                        loading={index === 0 ? 'eager' : 'lazy'}
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
                                                    {project.artifacts.map((artifact) => (
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
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="growth-caption">
                    <span className="growth-caption-label">Current Focus</span>
                    <strong>{activeProject.title}</strong>
                    <p>{activeProject.period}</p>
                </div>
            </section>
        </>
    );
}

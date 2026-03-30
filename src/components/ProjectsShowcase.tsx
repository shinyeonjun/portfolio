import { startTransition, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Copy, Expand, ExternalLink, Github, Info, X } from 'lucide-react';
import { projects, type Project } from './projectData';

type FullscreenAsset = {
    src: string;
    alt: string;
};

type ViewTransitionDocument = Document & {
    startViewTransition?: (update: () => void | Promise<void>) => {
        finished: Promise<void>;
    };
};

type PopoverElement = HTMLDivElement & {
    showPopover?: () => void;
    hidePopover?: () => void;
};

const projectDetailSlugs: Record<Project['id'], string> = {
    'de-pipeline': 'de-pipeline',
    caps: 'meeting',
    'ai-schedule': 'schedule',
    'control-dock': 'controldock',
    'wedding-album': 'wedding',
};

function getProjectDetailPath(project: Project) {
    return `${import.meta.env.BASE_URL}projects/${projectDetailSlugs[project.id]}/`;
}

function resolveProjectDetailUrl(project: Project) {
    return new URL(getProjectDetailPath(project), window.location.origin).toString();
}

function ProjectActionLinks({ project }: { project: Project }) {
    return (
        <div className="lab-action-links is-compact">
            {project.links.map((link) => (
                <a
                    className="lab-action-link hover-trigger"
                    href={link.href}
                    key={`${project.id}-${link.label}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="lab-action-icon" aria-hidden="true">
                        {link.icon === 'github' ? <Github size={15} /> : <ExternalLink size={15} />}
                    </span>
                    <span>{link.label}</span>
                </a>
            ))}
        </div>
    );
}

function ProjectMetaLine({ project }: { project: Project }) {
    return (
        <div className="lab-project-meta">
            <span className="lab-project-period">{project.period}</span>
            <span className={`project-badge ${project.isTeam ? 'team' : 'personal'}`}>
                {project.isTeam ? 'Team' : 'Personal'}
            </span>
        </div>
    );
}

function ProjectHighlights({ project }: { project: Project }) {
    return (
        <div className="lab-highlight-row">
            {project.highlights.map((item) => (
                <span className="lab-highlight-chip" key={item}>
                    <span className="lab-highlight-dot" aria-hidden="true" />
                    <span className="lab-highlight-text">{item}</span>
                </span>
            ))}
        </div>
    );
}

function ProjectProofGrid({ project }: { project: Project }) {
    const items = [
        { label: '문제', body: project.problem },
        { label: '해결', body: project.solution },
        { label: '내 역할', body: project.role },
        { label: '결과', body: project.result },
    ];

    return (
        <div className="lab-proof-grid">
            {items.map((item) => (
                <article className="lab-proof-card" key={`${project.id}-${item.label}`}>
                    <span className="lab-proof-label">{item.label}</span>
                    <p>{item.body}</p>
                </article>
            ))}
        </div>
    );
}

function ProjectBackendPoints({ project }: { project: Project }) {
    return (
        <section className="lab-proof-focus" aria-label="백엔드 포인트">
            <div className="lab-proof-head">
                <span className="lab-proof-label">Backend Focus</span>
                <strong>백엔드 포인트</strong>
            </div>
            <div className="lab-proof-tag-row">
                {project.backendPoints.map((point) => (
                    <span className="lab-proof-tag" key={`${project.id}-${point}`}>
                        {point}
                    </span>
                ))}
            </div>
        </section>
    );
}

function ProjectThumbStrip({
    project,
    onOpenAsset,
}: {
    project: Project;
    onOpenAsset: (asset: FullscreenAsset) => void;
}) {
    return (
        <div className="lab-thumb-strip is-compact">
            {project.visuals.slice(0, 3).map((visual) => (
                <button
                    className="lab-thumb-button hover-trigger"
                    key={visual.alt}
                    onClick={() => onOpenAsset({ src: visual.src, alt: visual.alt })}
                    type="button"
                >
                    <figure className="lab-thumb-card">
                        <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
                        <figcaption>{visual.alt}</figcaption>
                    </figure>
                </button>
            ))}
        </div>
    );
}

function ProjectArtifactLinks({
    project,
    onOpenAsset,
}: {
    project: Project;
    onOpenAsset: (asset: FullscreenAsset) => void;
}) {
    return (
        <section className="lab-artifact-block" aria-label="설계 자료">
            <div className="lab-proof-head">
                <span className="lab-proof-label">Artifacts</span>
                <strong>설계 자료</strong>
                <span className="lab-artifact-hint">
                    <Expand size={13} />
                    <span>클릭하면 크게 볼 수 있습니다</span>
                </span>
            </div>
            <div className="lab-artifact-links">
                {project.artifacts
                    .filter((artifact) => artifact.src)
                    .map((artifact) => (
                        <button
                            className="lab-artifact-link hover-trigger"
                            key={`${project.id}-${artifact.name}`}
                            onClick={() => onOpenAsset({ src: artifact.src!, alt: artifact.name })}
                            type="button"
                        >
                            <span>{artifact.name}</span>
                            <span className="lab-artifact-action">
                                <Expand size={13} />
                                <span>Preview</span>
                            </span>
                        </button>
                    ))}
            </div>
        </section>
    );
}

function ProjectDetailPopover({
    project,
    copied,
    onClose,
    onCopy,
    popoverRef,
}: {
    project: Project;
    copied: boolean;
    onClose: () => void;
    onCopy: () => void;
    popoverRef: RefObject<PopoverElement | null>;
}) {
    const detailPath = getProjectDetailPath(project);

    return (
        <div className="lab-popover-panel" popover="auto" ref={popoverRef}>
            <div className="lab-popover-head">
                <div>
                    <span className="lab-proof-label">Details</span>
                    <strong>{project.title}</strong>
                </div>
                <button className="lab-popover-close hover-trigger" onClick={onClose} type="button">
                    <X size={16} />
                </button>
            </div>
            <p className="lab-popover-summary">{project.cardSummary}</p>
            <div className="lab-popover-meta">
                <span>{project.period}</span>
                <span>{project.isTeam ? 'Team Project' : 'Personal Project'}</span>
            </div>
            <div className="lab-popover-tags">
                {project.stack.slice(0, 5).map((stack) => (
                    <span className="lab-proof-tag" key={`${project.id}-${stack}`}>
                        {stack}
                    </span>
                ))}
            </div>
            <div className="lab-popover-actions">
                <a className="lab-popover-link hover-trigger" href={detailPath}>
                    상세 페이지 보기
                </a>
                <button className="lab-popover-copy hover-trigger" onClick={onCopy} type="button">
                    <Copy size={14} />
                    <span>{copied ? '복사됨' : '링크 복사'}</span>
                </button>
            </div>
        </div>
    );
}

export default function ProjectsShowcase() {
    const defaultIndex = Math.max(
        0,
        projects.findIndex((project) => project.id === 'caps'),
    );
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [copied, setCopied] = useState(false);
    const [fullscreenAsset, setFullscreenAsset] = useState<FullscreenAsset | null>(null);
    const detailButtonRef = useRef<HTMLButtonElement | null>(null);
    const detailPopoverRef = useRef<PopoverElement | null>(null);
    const fullscreenRef = useRef<HTMLDivElement | null>(null);
    const activeProject = projects[activeIndex] ?? projects[0];
    const sideProjects = projects.filter((_, index) => index !== activeIndex);
    const detailUrl = useMemo(() => resolveProjectDetailUrl(activeProject), [activeProject]);

    useEffect(() => {
        if (!copied) {
            return undefined;
        }

        const timer = window.setTimeout(() => setCopied(false), 1400);
        return () => window.clearTimeout(timer);
    }, [copied]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setFullscreenAsset(null);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        const popover = detailPopoverRef.current;
        if (popover?.matches(':popover-open')) {
            popover.hidePopover?.();
        }
    }, [activeIndex]);

    useEffect(() => {
        if (!fullscreenAsset) {
            return undefined;
        }

        const target = fullscreenRef.current;
        if (!target?.requestFullscreen) {
            return undefined;
        }

        const rafId = window.requestAnimationFrame(() => {
            target.requestFullscreen().catch(() => {
                /* 전체 화면 진입이 막히면 레이어만 유지한다. */
            });
        });

        return () => window.cancelAnimationFrame(rafId);
    }, [fullscreenAsset]);

    const switchProject = (nextProjectId: Project['id']) => {
        const nextIndex = projects.findIndex((project) => project.id === nextProjectId);

        if (nextIndex < 0 || nextIndex === activeIndex) {
            return;
        }

        const update = () => {
            startTransition(() => {
                setCopied(false);
                setActiveIndex(nextIndex);
            });
        };

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const transitionDocument = document as ViewTransitionDocument;

        if (!prefersReducedMotion && transitionDocument.startViewTransition) {
            transitionDocument.startViewTransition(update);
            return;
        }

        update();
    };

    const toggleDetailsPopover = () => {
        const button = detailButtonRef.current;
        const popover = detailPopoverRef.current;

        if (!button || !popover) {
            return;
        }

        if (popover.matches(':popover-open')) {
            popover.hidePopover?.();
            return;
        }

        const rect = button.getBoundingClientRect();
        const width = Math.min(320, window.innerWidth - 24);
        const top = Math.min(window.innerHeight - 24, rect.bottom + 12);
        const left = Math.min(Math.max(12, rect.right - width), window.innerWidth - width - 12);

        popover.style.setProperty('--lab-popover-top', `${top}px`);
        popover.style.setProperty('--lab-popover-left', `${left}px`);
        popover.style.setProperty('--lab-popover-width', `${width}px`);
        popover.showPopover?.();
    };

    const closeDetailsPopover = () => {
        detailPopoverRef.current?.hidePopover?.();
    };

    const copyProjectLink = async () => {
        try {
            await navigator.clipboard.writeText(detailUrl);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    const openAssetFullscreen = (asset: FullscreenAsset) => {
        setFullscreenAsset(asset);
    };

    const closeAssetFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {
                /* 이미 종료된 경우 무시한다. */
            });
        }
        setFullscreenAsset(null);
    };

    return (
        <section className="section project-showcase-section" id="projects">
            <div className="section-header growth-section-header project-showcase-header">
                <p className="eyebrow">Projects</p>
                <h2>Project Index</h2>
                <p className="growth-intro">
                    백엔드, 데이터 파이프라인, FastAPI, AI Workflow 프로젝트를 대표작 중심으로 정리했습니다.
                </p>
            </div>

            <div className="lab-layout lab-layout-modular project-showcase-layout">
                <article className="lab-feature-stage" style={{ viewTransitionName: 'project-stage' }}>
                    <div className="lab-feature-copy">
                        <div className="lab-feature-topline">
                            <span className="lab-kicker">Main Project</span>
                            <div className="lab-feature-actions">
                                <ProjectActionLinks project={activeProject} />
                                <button
                                    aria-haspopup="dialog"
                                    className="lab-action-button hover-trigger"
                                    onClick={toggleDetailsPopover}
                                    ref={detailButtonRef}
                                    type="button"
                                >
                                    <Info size={15} />
                                    <span>세부 정보</span>
                                </button>
                            </div>
                        </div>
                        <ProjectDetailPopover
                            copied={copied}
                            onClose={closeDetailsPopover}
                            onCopy={copyProjectLink}
                            popoverRef={detailPopoverRef}
                            project={activeProject}
                        />
                        <h2 style={{ viewTransitionName: 'project-title' }}>{activeProject.title}</h2>
                        <ProjectMetaLine project={activeProject} />
                        <p style={{ viewTransitionName: 'project-summary' }}>{activeProject.summary}</p>
                        <ProjectHighlights project={activeProject} />
                        <ProjectProofGrid project={activeProject} />
                        <ProjectBackendPoints project={activeProject} />
                    </div>

                    <div className="lab-feature-visuals">
                        <div className="lab-proof-head">
                            <span className="lab-proof-label">Visual</span>
                            <strong>대표 화면</strong>
                        </div>
                        <button
                            className="lab-feature-visual-button hover-trigger"
                            onClick={() =>
                                openAssetFullscreen({
                                    src: activeProject.visuals[0].src,
                                    alt: activeProject.visuals[0].alt,
                                })
                            }
                            type="button"
                        >
                            <img
                                src={activeProject.visuals[0].src}
                                alt={activeProject.visuals[0].alt}
                                className="lab-feature-main-image"
                                loading="eager"
                                decoding="async"
                                style={{ viewTransitionName: 'project-image' }}
                            />
                            <span className="lab-preview-badge">
                                <Expand size={14} />
                                <span>전체 화면</span>
                            </span>
                        </button>
                        <ProjectThumbStrip onOpenAsset={openAssetFullscreen} project={activeProject} />
                        <ProjectArtifactLinks onOpenAsset={openAssetFullscreen} project={activeProject} />
                    </div>
                </article>

                <div className="lab-module-grid">
                    {sideProjects.map((project) => (
                        <button
                            className="lab-module-card hover-trigger"
                            key={project.id}
                            onClick={() => switchProject(project.id)}
                            type="button"
                        >
                            <div className="lab-module-copy">
                                <span>{project.period}</span>
                                <strong>{project.title}</strong>
                                <p>{project.cardSummary}</p>
                            </div>
                            <img
                                src={project.visuals[0].src}
                                alt={project.visuals[0].alt}
                                loading="lazy"
                                decoding="async"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {fullscreenAsset ? (
                <div className="lab-fullscreen-stage" ref={fullscreenRef}>
                    <button className="lab-fullscreen-close hover-trigger" onClick={closeAssetFullscreen} type="button">
                        <X size={18} />
                        <span>닫기</span>
                    </button>
                    <img alt={fullscreenAsset.alt} className="lab-fullscreen-media" src={fullscreenAsset.src} />
                    <p className="lab-fullscreen-caption">{fullscreenAsset.alt}</p>
                </div>
            ) : null}
        </section>
    );
}

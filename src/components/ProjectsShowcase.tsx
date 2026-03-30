import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects, type Project } from './projectData';

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

function ProjectThumbStrip({ project }: { project: Project }) {
    return (
        <div className="lab-thumb-strip is-compact">
            {project.visuals.slice(0, 3).map((visual) => (
                <figure className="lab-thumb-card" key={visual.alt}>
                    <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
                    <figcaption>{visual.alt}</figcaption>
                </figure>
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

function ProjectArtifactLinks({ project }: { project: Project }) {
    return (
        <section className="lab-artifact-block" aria-label="설계 자료">
            <div className="lab-proof-head">
                <span className="lab-proof-label">Artifacts</span>
                <strong>설계 자료</strong>
            </div>
            <div className="lab-artifact-links">
                {project.artifacts
                    .filter((artifact) => artifact.src)
                    .map((artifact) => (
                        <a
                            className="lab-artifact-link hover-trigger"
                            href={artifact.src}
                            key={`${project.id}-${artifact.name}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {artifact.name}
                        </a>
                    ))}
            </div>
        </section>
    );
}

export default function ProjectsShowcase() {
    const defaultIndex = Math.max(
        0,
        projects.findIndex((project) => project.id === 'caps'),
    );
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const activeProject = projects[activeIndex] ?? projects[0];
    const sideProjects = projects.filter((_, index) => index !== activeIndex);

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
                <article className="lab-feature-stage">
                    <div className="lab-feature-copy">
                        <div className="lab-feature-topline">
                            <span className="lab-kicker">Main Project</span>
                            <ProjectActionLinks project={activeProject} />
                        </div>
                        <h2>{activeProject.title}</h2>
                        <ProjectMetaLine project={activeProject} />
                        <p>{activeProject.summary}</p>
                        <ProjectHighlights project={activeProject} />
                        <ProjectProofGrid project={activeProject} />
                        <ProjectBackendPoints project={activeProject} />
                    </div>

                    <div className="lab-feature-visuals">
                        <div className="lab-proof-head">
                            <span className="lab-proof-label">Visual</span>
                            <strong>대표 화면</strong>
                        </div>
                        <img
                            src={activeProject.visuals[0].src}
                            alt={activeProject.visuals[0].alt}
                            className="lab-feature-main-image"
                            loading="eager"
                            decoding="async"
                        />
                        <ProjectThumbStrip project={activeProject} />
                        <ProjectArtifactLinks project={activeProject} />
                    </div>
                </article>

                <div className="lab-module-grid">
                    {sideProjects.map((project) => (
                        <button
                            className="lab-module-card hover-trigger"
                            key={project.id}
                            onClick={() => setActiveIndex(projects.findIndex((item) => item.id === project.id))}
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
        </section>
    );
}

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
                <p className="growth-intro">대표작을 먼저 보고, 아래에서 다른 프로젝트로 바로 이동합니다.</p>
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
                    </div>

                    <div className="lab-feature-visuals">
                        <img
                            src={activeProject.visuals[0].src}
                            alt={activeProject.visuals[0].alt}
                            className="lab-feature-main-image"
                            loading="eager"
                            decoding="async"
                        />
                        <ProjectThumbStrip project={activeProject} />
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
                                <p>{project.highlights[0]}</p>
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

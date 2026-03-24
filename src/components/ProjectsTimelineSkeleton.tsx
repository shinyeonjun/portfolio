const progressPlaceholders = Array.from({ length: 5 });
const highlightPlaceholders = Array.from({ length: 3 });
const supportVisualPlaceholders = Array.from({ length: 2 });
const artifactPlaceholders = Array.from({ length: 3 });

export default function ProjectsTimelineSkeleton() {
    return (
        <section className="section growth-section timeline-skeleton" id="projects" aria-busy="true">
            <div className="section-header growth-section-header timeline-skeleton-header">
                <p className="eyebrow">Projects</p>
                <div className="skeleton-block skeleton-title" />
                <div className="skeleton-block skeleton-line skeleton-line-wide" />
            </div>

            <div className="growth-shell">
                <div className="growth-header-row">
                    <div className="growth-progress timeline-skeleton-progress" aria-hidden="true">
                        {progressPlaceholders.map((_, index) => (
                            <div className="growth-progress-item timeline-skeleton-progress-item" key={index}>
                                <span className="growth-progress-dot" />
                                <span className="growth-progress-copy timeline-skeleton-copy">
                                    <span className="skeleton-block skeleton-line" />
                                    <span className="skeleton-block skeleton-line skeleton-line-short" />
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="growth-controls timeline-skeleton-controls" aria-hidden="true">
                        <span className="growth-control timeline-skeleton-circle" />
                        <div className="growth-control-status">
                            <span>Loading</span>
                            <strong>-- / --</strong>
                        </div>
                        <span className="growth-control timeline-skeleton-circle" />
                    </div>
                </div>

                <div className="growth-slide-card timeline-skeleton-card" aria-hidden="true">
                    <div className="growth-slide-copy timeline-skeleton-copy-panel">
                        <div className="skeleton-meta-row">
                            <span className="skeleton-block skeleton-chip" />
                            <span className="skeleton-block skeleton-chip skeleton-chip-wide" />
                            <span className="skeleton-block skeleton-chip" />
                        </div>

                        <div className="timeline-skeleton-heading">
                            <div className="skeleton-block skeleton-heading" />
                            <div className="skeleton-block skeleton-line skeleton-line-wide" />
                            <div className="skeleton-block skeleton-line" />
                        </div>

                        <div className="highlight-row growth-highlight-row">
                            {highlightPlaceholders.map((_, index) => (
                                <span className="skeleton-block skeleton-chip" key={index} />
                            ))}
                        </div>

                        <div className="growth-role-block timeline-skeleton-block">
                            <span className="meta-label">Role</span>
                            <div className="timeline-skeleton-stack">
                                <div className="skeleton-block skeleton-line skeleton-line-wide" />
                                <div className="skeleton-block skeleton-line" />
                            </div>
                        </div>

                        <div className="growth-stack-block timeline-skeleton-block">
                            <span className="meta-label">Tech Stack</span>
                            <div className="stack-row">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <span className="skeleton-block skeleton-chip" key={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="growth-slide-visuals timeline-skeleton-visuals">
                        <div className="growth-primary-visual timeline-skeleton-visual">
                            <div className="browser-bar">
                                <div className="browser-dot" style={{ background: '#ff5f57' }} />
                                <div className="browser-dot" style={{ background: '#febc2e' }} />
                                <div className="browser-dot" style={{ background: '#28c840' }} />
                                <span className="browser-url">Loading preview...</span>
                            </div>
                            <div className="skeleton-block timeline-skeleton-image" />
                        </div>

                        <div className="growth-support-visuals">
                            {supportVisualPlaceholders.map((_, index) => (
                                <div className="growth-support-card timeline-skeleton-support" key={index}>
                                    <div className="skeleton-block timeline-skeleton-thumb" />
                                    <div className="skeleton-block skeleton-line skeleton-line-short" />
                                </div>
                            ))}
                        </div>

                        <div className="growth-artifact-strip">
                            {artifactPlaceholders.map((_, index) => (
                                <div className="growth-artifact-card timeline-skeleton-support" key={index}>
                                    <div className="growth-artifact-head">
                                        <div className="timeline-skeleton-stack">
                                            <div className="skeleton-block skeleton-line skeleton-line-short" />
                                            <div className="skeleton-block skeleton-line skeleton-line-shorter" />
                                        </div>
                                        <span>Reference</span>
                                    </div>
                                    <div className="skeleton-block timeline-skeleton-thumb" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

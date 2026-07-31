import { useMemo, useState, type CSSProperties } from 'react';
import {
    ArrowUpRight,
    Boxes,
    ExternalLink,
    FileText,
    Github,
    Mail,
    Maximize2,
    X,
} from 'lucide-react';
import { projects, type Project } from './projectData';
import './SystemAtlas.css';

type AtlasEntry = {
    id: string;
    title: string;
    period: string;
    artifact: string;
    accent: string;
    summary: string;
    problem: string;
    role: string;
    decision: string;
    result: string;
    stack: string[];
    preview: string;
    previewAlt: string;
    href: string;
    placeholder?: boolean;
    project?: Project;
};

const visualMapEntry: AtlasEntry = {
    id: 'visual-map',
    title: 'Backend Visual Map',
    period: '최근 작업',
    artifact: '코드 · DB 추적',
    accent: '#287fce',
    summary:
        '백엔드 코드와 관계형 데이터베이스 메타데이터의 관계를 근거와 함께 탐색하는 개발자 도구입니다.',
    problem:
        '큰 백엔드 저장소에서 API가 어떤 테이블과 컬럼에 영향을 주는지 추적하려면 코드와 스키마를 계속 오가야 했습니다.',
    role: 'Tauri + React 기반 탐색 경험과 API Flow, Table Usage, Column Impact 중심의 정보 구조를 설계했습니다.',
    decision:
        'raw graph를 그대로 보여주는 대신, 확정 근거·후보·미확인을 나눠 focused view로 보여주는 방향을 선택했습니다.',
    result: '코드와 DB의 관계를 변경 영향 관점에서 빠르게 확인할 수 있는 Windows 우선 도구로 확장 중입니다.',
    stack: ['Tauri', 'React', 'Rust', '코드 분석', 'DB 메타데이터'],
    preview: '',
    previewAlt: 'Backend Visual Map 이미지 준비 중',
    href: 'https://github.com/shinyeonjun/visual_map',
    placeholder: true,
};

const accentPalette = ['#287fce', '#4fb8a5', '#e76f62', '#d7a348', '#9ac7a8'];

const atlasEntries: AtlasEntry[] = [
    visualMapEntry,
    ...projects.map((project, index): AtlasEntry => ({
        id: project.id,
        title: project.title,
        period: project.period,
        artifact: project.artifacts[0]?.name ?? '프로젝트 화면',
        accent: accentPalette[index % accentPalette.length],
        summary: project.summary,
        problem: project.problem,
        role: project.role,
        decision: project.solution,
        result: project.result,
        stack: project.stack,
        preview: project.visuals[0].src,
        previewAlt: project.visuals[0].alt,
        href: project.links[0]?.href ?? '#',
        project,
    })),
];

const artifactEntries = atlasEntries.filter((entry) => entry.id !== 'visual-map').slice(0, 4);

function getProjectDetailHref(entry: AtlasEntry) {
    if (entry.project?.links[1]?.href) {
        return entry.project.links[1].href;
    }

    return entry.href;
}

export default function SystemAtlas() {
    const [selectedId, setSelectedId] = useState('visual-map');
    const [fullscreen, setFullscreen] = useState<AtlasEntry | null>(null);

    const activeEntry = useMemo(
        () => atlasEntries.find((entry) => entry.id === selectedId) ?? visualMapEntry,
        [selectedId],
    );

    const handleSelect = (entry: AtlasEntry) => {
        setSelectedId(entry.id);
        document.querySelector('#selected-system')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="atlas-shell">
            <header className="atlas-header">
                <a className="atlas-brand" href="#home" aria-label="신연준 홈">
                    <strong>신연준</strong>
                    <span>Python Backend Developer</span>
                </a>

                <nav className="atlas-nav" aria-label="주요 메뉴">
                    <a href="#projects">프로젝트</a>
                    <a href="#systems">시스템</a>
                    <a href="#notes">기록</a>
                    <a href="https://github.com/shinyeonjun" target="_blank" rel="noreferrer">
                        GitHub <ArrowUpRight size={14} />
                    </a>
                </nav>
            </header>

            <main>
                <section className="atlas-intro" id="home">
                    <div className="atlas-intro-copy">
                        <p className="atlas-eyebrow">신연준 · Python Backend Developer</p>
                        <h1>
                            백엔드
                            <br />
                            <span>개발자</span>
                        </h1>
                        <div className="atlas-profile-grid">
                            <div>
                                <span>학력</span>
                                <strong>서원대학교 · 2021 — 2027.02 졸업 예정</strong>
                            </div>
                            <div>
                                <span>프로젝트</span>
                                <strong>{atlasEntries.length}개 시스템</strong>
                            </div>
                            <div>
                                <span>주력 기술</span>
                                <strong>Python · FastAPI</strong>
                            </div>
                            <div>
                                <span>관심 영역</span>
                                <strong>데이터 · 실시간 · AI</strong>
                            </div>
                        </div>
                        <div className="atlas-profile-stack" aria-label="주요 기술">
                            {['Python', 'FastAPI', 'PostgreSQL', 'GCP', 'React'].map((item) => (
                                <span key={item}>{item}</span>
                            ))}
                        </div>
                    </div>

                    <div className="atlas-intro-index" id="systems">
                        <div className="atlas-index-heading">
                            <span>선택한 시스템</span>
                            <span>{atlasEntries.length.toString().padStart(2, '0')}개</span>
                        </div>
                        <div className="atlas-index-lines">
                            {atlasEntries.map((entry, index) => (
                                <button
                                    className={`atlas-index-line${entry.id === selectedId ? ' is-active' : ''}`}
                                    key={entry.id}
                                    onClick={() => handleSelect(entry)}
                                    style={{ '--entry-accent': entry.accent } as CSSProperties}
                                    type="button"
                                >
                                    <span className="atlas-index-number">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="atlas-index-title">{entry.title}</span>
                                    <span className="atlas-index-artifact">{entry.artifact}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="atlas-section" id="selected-system">
                    <div className="atlas-section-head">
                        <div>
                            <p className="atlas-eyebrow">Selected system</p>
                            <h2>대표 설계 증거</h2>
                        </div>
                        <span className="atlas-section-note">프로젝트를 선택하면 이 화면이 바뀝니다.</span>
                    </div>

                    <article className="atlas-feature">
                        <div className="atlas-feature-copy">
                            <div className="atlas-feature-kicker">
                                <span className="atlas-dot" style={{ backgroundColor: activeEntry.accent }} />
                                <span>{activeEntry.period}</span>
                                <span>·</span>
                                <span>{activeEntry.artifact}</span>
                            </div>
                            <h3>{activeEntry.title}</h3>
                            <p className="atlas-feature-summary">{activeEntry.summary}</p>

                            <div className="atlas-evidence-grid">
                                <div>
                                    <span>문제</span>
                                    <p>{activeEntry.problem}</p>
                                </div>
                                <div>
                                    <span>역할</span>
                                    <p>{activeEntry.role}</p>
                                </div>
                                <div>
                                    <span>선택</span>
                                    <p>{activeEntry.decision}</p>
                                </div>
                                <div>
                                    <span>결과</span>
                                    <p>{activeEntry.result}</p>
                                </div>
                            </div>

                            <div className="atlas-stack" aria-label="사용 기술">
                                {activeEntry.stack.map((item) => (
                                    <span key={item}>{item}</span>
                                ))}
                            </div>

                            <div className="atlas-feature-actions">
                                <a className="atlas-button atlas-button-primary" href={activeEntry.href} target="_blank" rel="noreferrer">
                                    저장소 보기 <Github size={16} />
                                </a>
                                {activeEntry.project?.links[1] ? (
                                    <a
                                        className="atlas-button atlas-button-quiet"
                                        href={getProjectDetailHref(activeEntry)}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        발표 자료 <FileText size={16} />
                                    </a>
                                ) : null}
                            </div>
                        </div>

                        <div className="atlas-feature-visual">
                            <div className="atlas-visual-toolbar">
                                <span>VISUAL EVIDENCE</span>
                                {!activeEntry.placeholder ? (
                                    <button
                                        type="button"
                                        onClick={() => setFullscreen(activeEntry)}
                                        aria-label={`${activeEntry.title} 이미지 전체 보기`}
                                    >
                                        <Maximize2 size={15} /> 전체 보기
                                    </button>
                                ) : null}
                            </div>
                            {activeEntry.placeholder ? (
                                <div className="atlas-image-placeholder" role="img" aria-label={activeEntry.previewAlt}>
                                    <strong>이미지 준비 중</strong>
                                    <span>실제 프로젝트 캡처가 준비되면 이 영역에 추가됩니다.</span>
                                </div>
                            ) : (
                                <button
                                    className="atlas-feature-image-button"
                                    type="button"
                                    onClick={() => setFullscreen(activeEntry)}
                                >
                                    <img src={activeEntry.preview} alt={activeEntry.previewAlt} />
                                </button>
                            )}
                            <p className="atlas-visual-caption">
                                {activeEntry.placeholder
                                    ? '설계 화면 캡처는 추후 추가됩니다.'
                                    : `${activeEntry.title}의 ${activeEntry.artifact}를 중심으로 구성한 설계 증거입니다.`}
                            </p>
                        </div>
                    </article>
                </section>

                <section className="atlas-section atlas-artifact-section" id="notes">
                    <div className="atlas-section-head">
                        <div>
                            <p className="atlas-eyebrow">Project artifacts</p>
                            <h2>프로젝트마다 남겨둔 설계 언어</h2>
                        </div>
                        <span className="atlas-section-note">화면보다 흐름과 근거를 먼저 보여줍니다.</span>
                    </div>

                    <div className="atlas-artifact-strip">
                        {artifactEntries.map((entry) => (
                            <button
                                className="atlas-artifact-card"
                                key={entry.id}
                                onClick={() => handleSelect(entry)}
                                type="button"
                            >
                                <div className="atlas-artifact-card-head">
                                    <span className="atlas-artifact-type" style={{ color: entry.accent }}>
                                        {entry.artifact}
                                    </span>
                                    <ArrowUpRight size={15} />
                                </div>
                                <img src={entry.preview} alt={entry.previewAlt} loading="lazy" />
                                <strong>{entry.title}</strong>
                                <p>{entry.summary}</p>
                            </button>
                        ))}
                    </div>

                    <div className="atlas-project-table" id="projects">
                        <div className="atlas-project-table-head">
                            <span>프로젝트</span>
                            <span>증거</span>
                            <span>설명</span>
                            <span>링크</span>
                        </div>
                        {atlasEntries.map((entry) => (
                            <div className="atlas-project-row" key={entry.id}>
                                <button className="atlas-project-name" type="button" onClick={() => handleSelect(entry)}>
                                    <span className="atlas-row-marker" style={{ backgroundColor: entry.accent }} />
                                    <span>
                                        <strong>{entry.title}</strong>
                                        <small>{entry.period}</small>
                                    </span>
                                </button>
                                <span className="atlas-project-artifact">{entry.artifact}</span>
                                <span className="atlas-project-description">{entry.summary}</span>
                                <div className="atlas-project-links">
                                    <a href={entry.href} target="_blank" rel="noreferrer" aria-label={`${entry.title} 저장소`}>
                                        <Github size={15} />
                                    </a>
                                    {entry.project?.links[1] ? (
                                        <a
                                            href={getProjectDetailHref(entry)}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`${entry.title} 발표 자료`}
                                        >
                                            <FileText size={15} />
                                        </a>
                                    ) : (
                                        <span className="atlas-link-placeholder" aria-hidden="true">
                                            <Boxes size={15} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="atlas-footer">
                <div>
                    <strong>신연준</strong>
                    <span>구조 · 흐름 · 실제 동작</span>
                </div>
                <div className="atlas-footer-links">
                    <a href="https://github.com/shinyeonjun" target="_blank" rel="noreferrer">
                        GitHub <ExternalLink size={14} />
                    </a>
                    <a href="mailto:sinyeonjun@gmail.com">
                        sinyeonjun@gmail.com <Mail size={14} />
                    </a>
                </div>
                <span>© 2026</span>
            </footer>

            {fullscreen ? (
                <div className="atlas-lightbox" role="dialog" aria-modal="true" aria-label={`${fullscreen.title} 이미지`}>
                    <button className="atlas-lightbox-close" type="button" onClick={() => setFullscreen(null)}>
                        <X size={18} /> 닫기
                    </button>
                    <img src={fullscreen.preview} alt={fullscreen.previewAlt} />
                    <p>{fullscreen.title} · {fullscreen.artifact}</p>
                </div>
            ) : null}
        </div>
    );
}

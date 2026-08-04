import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
    ArrowUpRight,
    Boxes,
    Copy,
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
    evidence: string;
    stack: string[];
    artifacts: { name: string; src?: string }[];
    visuals: { src: string; alt: string }[];
    preview: string;
    previewAlt: string;
    cardPreview?: string;
    cardPreviewAlt?: string;
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
    evidence: 'API Flow · Table Usage · Column Impact 정보 구조로 코드와 DB 영향 범위를 나눠 검증하도록 설계했습니다.',
    stack: ['Tauri', 'React', 'Rust', '코드 분석', 'DB 메타데이터'],
    artifacts: [],
    visuals: [],
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
        evidence: project.evidence,
        stack: project.stack,
        artifacts: project.artifacts,
        visuals: project.visuals,
        preview: project.artifacts.find((artifact) => artifact.src)?.src ?? project.visuals[0].src,
        previewAlt:
            project.artifacts.find((artifact) => artifact.src)?.name
                ? `${project.title} ${project.artifacts.find((artifact) => artifact.src)?.name}`
                : project.visuals[0].alt,
        cardPreview: project.visuals[0].src,
        cardPreviewAlt: project.visuals[0].alt,
        href: project.links[0]?.href ?? '#',
        project,
    })),
];

const artifactEntries = atlasEntries.filter((entry) => entry.id !== 'visual-map').slice(0, 4);
const contactEmail = 'sinyeonjun@gmail.com';

function getProjectDetailHref(entry: AtlasEntry) {
    if (entry.project?.links[1]?.href) {
        return entry.project.links[1].href;
    }

    return entry.href;
}

export default function SystemAtlas() {
    const [selectedId, setSelectedId] = useState('visual-map');
    const [featureTab, setFeatureTab] = useState<'ui' | 'design'>('ui');
    const [activeVisualIndex, setActiveVisualIndex] = useState(0);
    const [activeArtifactIndex, setActiveArtifactIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState<AtlasEntry | null>(null);
    const [emailCopied, setEmailCopied] = useState(false);
    const lightboxCloseRef = useRef<HTMLButtonElement>(null);

    const activeEntry = useMemo(
        () => atlasEntries.find((entry) => entry.id === selectedId) ?? visualMapEntry,
        [selectedId],
    );

    useEffect(() => {
        if (!fullscreen) return undefined;

        lightboxCloseRef.current?.focus();
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setFullscreen(null);
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [fullscreen]);

    const handleSelect = (entry: AtlasEntry) => {
        setSelectedId(entry.id);
        setFeatureTab(entry.visuals.length > 0 ? 'ui' : 'design');
        setActiveVisualIndex(0);
        setActiveArtifactIndex(0);
        document.querySelector('#selected-system')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const copyEmail = async () => {
        if (!navigator.clipboard) return;

        try {
            await navigator.clipboard.writeText(contactEmail);
            setEmailCopied(true);
            window.setTimeout(() => setEmailCopied(false), 1600);
        } catch {
            setEmailCopied(false);
        }
    };

    const featureItems = featureTab === 'ui' ? activeEntry.visuals : activeEntry.artifacts;
    const activeFeatureIndex = featureTab === 'ui' ? activeVisualIndex : activeArtifactIndex;
    const activeFeature = featureItems[activeFeatureIndex] ?? featureItems[0];
    const activeFeatureLabel = featureTab === 'ui' ? activeEntry.visuals[activeVisualIndex]?.alt : activeEntry.artifacts[activeArtifactIndex]?.name;
    const activePreview = activeFeature?.src ?? activeEntry.preview;
    const activePreviewAlt = activeFeature?.src ? `${activeEntry.title} ${activeFeatureLabel}` : activeEntry.previewAlt;
    const openFullscreen = () => {
        if (!activePreview || activeEntry.placeholder) return;

        openImageFullscreen(activeEntry, activePreview, activePreviewAlt, activeFeatureLabel ?? activeEntry.artifact);
    };

    const renderFeaturePicker = (
        tab: 'ui' | 'design',
        label: string,
        items: { src: string; alt: string }[] | { name: string; src?: string }[],
    ) => {
        if (items.length === 0) return null;

        const isUi = tab === 'ui';
        const activeIndex = isUi ? activeVisualIndex : activeArtifactIndex;

        return (
            <div className="atlas-evidence-picker" aria-label={`${activeEntry.title} ${label}`}>
                <div className="atlas-evidence-picker-head">
                    <span>{label}</span>
                    <span>{items.length}개 자료</span>
                </div>
                <div className="atlas-evidence-picker-list">
                    {items.map((item, index) => {
                        const itemLabel = 'alt' in item ? item.alt : item.name;

                        return (
                            <button
                                className={`atlas-evidence-picker-item${isUi === (featureTab === 'ui') && index === activeIndex ? ' is-active' : ''}`}
                                key={itemLabel}
                                onClick={() => {
                                    setFeatureTab(tab);
                                    if (isUi) setActiveVisualIndex(index);
                                    else setActiveArtifactIndex(index);
                                }}
                                type="button"
                            >
                                {item.src ? <img src={item.src} alt="" loading="lazy" /> : null}
                                <span>
                                    <small>{String(index + 1).padStart(2, '0')}</small>
                                    <strong>{itemLabel}</strong>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const openImageFullscreen = (entry: AtlasEntry, preview: string, previewAlt: string, label: string) => {
        setFullscreen({ ...entry, artifact: label, preview, previewAlt });
    };

    return (
        <div className="atlas-shell">
            <header className="atlas-header">
                <a className="atlas-brand" href="#home" aria-label="신연준 홈">
                    <strong>신연준</strong>
                    <span>Python Backend Developer</span>
                </a>

                <div className="atlas-header-right">
                    <nav className="atlas-nav" aria-label="주요 메뉴">
                        <a href="#projects">프로젝트</a>
                        <a href="#systems">시스템</a>
                        <a href="#notes">작업물</a>
                        <a href="https://github.com/shinyeonjun" target="_blank" rel="noreferrer">
                            GitHub <ArrowUpRight size={14} />
                        </a>
                    </nav>
                    <button className="atlas-header-email" type="button" onClick={copyEmail} aria-label="이메일 주소 복사">
                        {emailCopied ? '복사됨' : contactEmail} <Copy size={14} />
                    </button>
                </div>
            </header>

            <main>
                <section className="atlas-intro" id="home">
                    <div className="atlas-intro-copy">
                        <p className="atlas-eyebrow">신연준 · Python Backend Developer</p>
                        <h1>
                            백엔드
                            <br />
                            <span className="atlas-title-line">
                                개발자
                                <small>되고싶어요....</small>
                            </span>
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
                            <div>
                                <span>자격</span>
                                <strong>정보처리기사 필기 합격 · 실기 예정</strong>
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
                            <span>프로젝트 목록</span>
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
                            <p className="atlas-eyebrow">Selected project</p>
                            <h2>프로젝트 설계</h2>
                        </div>
                        <span className="atlas-section-note">프로젝트를 선택하면 대표 설계와 설명이 바뀝니다.</span>
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
                            <div className="atlas-proof-note">
                                <span>검증 근거</span>
                                <p>{activeEntry.evidence}</p>
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
                                <span>
                                    {activeEntry.placeholder
                                        ? 'VISUAL EVIDENCE'
                                        : `${featureTab === 'ui' ? '프로젝트 UI' : '설계 자료'} ${String(featureItems.length).padStart(2, '0')}`}
                                </span>
                                {!activeEntry.placeholder ? (
                                    <button
                                        type="button"
                                        onClick={openFullscreen}
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
                                    onClick={openFullscreen}
                                >
                                    <img src={activePreview} alt={activePreviewAlt} />
                                </button>
                            )}
                            <p className="atlas-visual-caption">
                                {activeEntry.placeholder
                                    ? '설계 화면 캡처는 추후 추가됩니다.'
                                    : `${activeEntry.title}의 ${activeFeatureLabel ?? activeEntry.artifact}를 보여주는 자료입니다.`}
                            </p>
                            {renderFeaturePicker('ui', 'PROJECT UI', activeEntry.visuals)}
                            {renderFeaturePicker('design', 'DESIGN DOCUMENTS', activeEntry.artifacts)}
                        </div>
                    </article>
                </section>

                <section className="atlas-section atlas-artifact-section" id="notes">
                    <div className="atlas-section-head">
                        <div>
                            <p className="atlas-eyebrow">Projects</p>
                            <h2>프로젝트 작업물</h2>
                        </div>
                        <span className="atlas-section-note">카드를 선택하면 이 영역에서 UI와 설계 자료를 살펴볼 수 있습니다.</span>
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
                                    <strong className="atlas-artifact-title" style={{ color: entry.accent }}>
                                        {entry.title}
                                    </strong>
                                    <span className="atlas-artifact-card-cta">
                                        설계 보기 <ArrowUpRight size={15} />
                                    </span>
                                </div>
                                <img
                                    src={entry.cardPreview ?? entry.preview}
                                    alt={entry.cardPreviewAlt ?? entry.previewAlt}
                                    loading="lazy"
                                />
                                <span className="atlas-artifact-card-label">대표 증거 · {entry.artifact}</span>
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
                    <a href={`mailto:${contactEmail}`}>
                        {contactEmail} <Mail size={14} />
                    </a>
                </div>
                <span>© 2026</span>
            </footer>

            {fullscreen ? (
                <div className="atlas-lightbox" role="dialog" aria-modal="true" aria-label={`${fullscreen.title} 이미지`}>
                    <button ref={lightboxCloseRef} className="atlas-lightbox-close" type="button" onClick={() => setFullscreen(null)}>
                        <X size={18} /> 닫기
                    </button>
                    <img src={fullscreen.preview} alt={fullscreen.previewAlt} />
                    <p>{fullscreen.title} · {fullscreen.artifact}</p>
                </div>
            ) : null}
        </div>
    );
}

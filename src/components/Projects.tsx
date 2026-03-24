import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import deDashboard from '../assets/projects/de/de-dashboard.png';
import deChart from '../assets/projects/de/de-chart.png';
import deChat from '../assets/projects/de/de-chat.png';
import deArchitecture from '../assets/projects/de/de-architecture.svg';
import deDataflow from '../assets/projects/de/de-dataflow.svg';
import deChatbotArchitecture from '../assets/projects/de/de-chatbot-architecture.svg';
import capsOverlay from '../assets/projects/meeting/caps-overlay.png';
import meetingSystemOverview from '../assets/projects/meeting/meeting-system-overview.jpg';
import meetingArchitecture from '../assets/projects/meeting/meeting-cs-architecture.jpg';
import meetingSttPoc from '../assets/projects/meeting/meeting-stt-poc.jpg';
import scheduleLogin from '../assets/projects/schedule/schedule-login.png';
import scheduleAnalysis from '../assets/projects/schedule/schedule-analysis.png';
import scheduleGroup from '../assets/projects/schedule/schedule-group.png';
import scheduleErd from '../assets/projects/schedule/schedule-erd.png';
import scheduleArchitecture from '../assets/projects/schedule/schedule-architecture.png';
import scheduleOutputFlow from '../assets/projects/schedule/schedule-output-flow.svg';
import controlDockDashboard from '../assets/projects/controldock/controldock-dashboard.png';
import controlDockAgentUi from '../assets/projects/controldock/controldock-agent-ui.png';
import controlDockDeploymentUi from '../assets/projects/controldock/controldock-deployment-ui.png';
import controlDockArchitecture from '../assets/projects/controldock/controldock-architecture.png';
import controlDockDbDesign from '../assets/projects/controldock/controldock-db-design.png';
import controlDockSequence from '../assets/projects/controldock/controldock-sequence.png';
import weddingTitle from '../assets/projects/wedding/wedding-title.jpg';
import weddingBride from '../assets/projects/wedding/wedding-bride.jpg';
import weddingPhotobooth from '../assets/projects/wedding/wedding-photobooth.jpg';
import weddingDesign from '../assets/projects/wedding/wedding-design.jpg';
import weddingSchema from '../assets/projects/wedding/wedding-schema.jpg';
import weddingStorage from '../assets/projects/wedding/wedding-storage.jpg';

export type Project = {
    id: string;
    title: string;
    period: string;
    summary: string;
    stack: string[];
    role: string;
    highlights: string[];
    visuals: { src: string; alt: string }[];
    artifacts: { name: string; src?: string }[];
    links: { href: string; label: string; icon: 'github' | 'external' }[];
    isTeam?: boolean;
};

const projects: Project[] = [
    {
        id: 'de-pipeline',
        title: 'DE-pipeline',
        period: '2026.01 - 2026.02',
        summary:
            'YouTube 데이터 수집·정제·적재와 대시보드·챗봇 응답 구조를 연결한 데이터 파이프라인 프로젝트',
        stack: ['Python', 'YouTube API', 'GCP', 'Supabase', 'FastAPI', 'RAG'],
        role: '데이터 수집부터 ELT 흐름, 대시보드, 챗봇 연결까지 전반을 직접 구현',
        highlights: ['ELT 흐름 설계', '데이터 기반 챗봇', '차트 시각화'],
        visuals: [
            { src: deDashboard, alt: 'DE 대시보드' },
            { src: deChat, alt: '챗봇 응답' },
            { src: deChart, alt: '차트 화면' },
        ],
        artifacts: [
            { name: '전체 아키텍처', src: deArchitecture },
            { name: '데이터 흐름', src: deDataflow },
            { name: 'AI 챗봇 구조', src: deChatbotArchitecture },
        ],
        links: [
            { href: 'https://github.com/shinyeonjun/DE-pipeline', label: 'GitHub', icon: 'github' },
        ],
        isTeam: false,
    },
    {
        id: 'caps',
        title: 'Meeting Overlay Assistant',
        period: '2026.03 - 진행 중',
        summary:
            '회의 플랫폼에 종속되지 않는 오버레이에서 partial/final 자막과 핵심 이벤트를 실시간으로 보조하고, 회의 종료 후에는 사내 DB 기반 워크스페이스에서 기록 검색과 후속 업무까지 이어가는 로컬 AI 회의 시스템',
        stack: ['Python', 'FastAPI', 'WebSocket', 'Tauri 2', 'React', 'PostgreSQL', 'pgvector', 'Redis'],
        role: '오버레이 클라이언트와 실시간 통신 서버, 워크스페이스 흐름을 설계하고 STT 모델 벤치마킹, 이벤트 추출 구조, 회의 기록 데이터 저장 방식을 정리',
        highlights: ['플랫폼 독립 오버레이', '하이브리드 STT 전략', '사내 DB 중심 기록 축적'],
        visuals: [{ src: capsOverlay, alt: '실시간 오버레이' }],
        artifacts: [
            { name: '시스템 개요', src: meetingSystemOverview },
            { name: 'C/S 아키텍처', src: meetingArchitecture },
            { name: 'STT PoC', src: meetingSttPoc },
        ],
        links: [
            { href: 'https://github.com/shinyeonjun/meeting-overlay-assistant', label: 'GitHub', icon: 'github' },
            { href: `${import.meta.env.BASE_URL}projects/meeting/meeting-overlay-assistant-presentation.pdf`, label: 'Presentation', icon: 'external' },
        ],
        isTeam: false,
    },
    {
        id: 'ai-schedule',
        title: 'AI Schedule Web',
        period: '2025.05 - 2025.10',
        summary: 'GPT 기반 일정 추출·등록 자동화와 구조화 출력 보정 프로젝트',
        stack: ['Python', 'FastAPI', 'GPT API', 'Calendar', 'Gmail', 'ICS'],
        role: '출력 구조 설계, 시간 컨텍스트 보정, 일정 등록 흐름 연결을 중심으로 구현',
        highlights: ['JSON 템플릿 고정', '현재 시간 보정', 'Calendar·메일 연동'],
        visuals: [
            { src: scheduleLogin, alt: '로그인 화면' },
            { src: scheduleAnalysis, alt: '분석 결과' },
            { src: scheduleGroup, alt: '그룹 관리' },
        ],
        artifacts: [
            { name: '시스템 구조', src: scheduleArchitecture },
            { name: '출력 구조 흐름', src: scheduleOutputFlow },
            { name: 'ERD', src: scheduleErd }
        ],
        links: [
            { href: 'https://github.com/shinyeonjun/ai-schedule-web', label: 'GitHub', icon: 'github' },
            { href: `${import.meta.env.BASE_URL}projects/schedule/ai-schedule-web-presentation.pptx`, label: 'Presentation', icon: 'external' },
        ],
        isTeam: false,
    },
    {
        id: 'control-dock',
        title: 'ControlDock',
        period: '2025.12',
        summary:
            '중앙 서버가 여러 Windows 에이전트 PC와 통신하며 상태를 확인하고, 원격 배포 작업과 사내 공지 전송을 통합 관리하는 원격 모니터링 및 배포 시스템',
        stack: ['Python', 'PostgreSQL', 'Docker', 'HTML/CSS/JS', 'TCP/UDP', 'REST API'],
        role: '팀 프로젝트에서 HTTP·TCP·UDP 서버와 백엔드 서비스 로직을 맡아 PC 등록 승인 흐름, 상태 체크, 원격 배포 요청 처리, 공지 전송 프로토콜을 구현',
        highlights: ['에이전트 등록 및 상태 모니터링', '원격 배포 실행·재시도 설계', '브로드캐스트 공지 및 수신 추적'],
        visuals: [
            { src: controlDockDashboard, alt: '메인 대시보드' },
            { src: controlDockAgentUi, alt: '에이전트 관리 UI' },
            { src: controlDockDeploymentUi, alt: '배포 관리 UI' },
        ],
        artifacts: [
            { name: 'C/S 아키텍처', src: controlDockArchitecture },
            { name: 'DB 설계', src: controlDockDbDesign },
            { name: 'PC 등록 시퀀스', src: controlDockSequence },
        ],
        links: [
            { href: 'https://github.com/shinyeonjun/ControlDock', label: 'GitHub', icon: 'github' },
            { href: `${import.meta.env.BASE_URL}projects/controldock/controldock-presentation.pdf`, label: 'Presentation', icon: 'external' },
        ],
        isTeam: true,
    },
    {
        id: 'wedding-album',
        title: 'Wedding Album Generator',
        period: '2025.06',
        summary:
            'GPT API로 결혼식 행사 사진을 분석하고, 신랑·신부·스튜디오·야외·본식·포토부스 섹션별 앨범 페이지를 자동 생성하는 프로토타입 시스템',
        stack: ['Python', 'GPT-4o-mini', 'Supabase', 'PostgreSQL', 'HTML'],
        role: '사진 분석 카테고리 설계, 앨범 페이지 구성, Supabase 스토리지/DB 스키마 설계, 발표 자료 제작을 맡아 개인 프로젝트 형태로 진행',
        highlights: ['사진 속성 분석', '앨범 페이지 자동 생성', 'Supabase 스키마 설계'],
        visuals: [
            { src: weddingTitle, alt: '타이틀 페이지' },
            { src: weddingBride, alt: '신부 페이지' },
            { src: weddingPhotobooth, alt: '포토부스 페이지' },
        ],
        artifacts: [
            { name: 'UI 시안', src: weddingDesign },
            { name: 'DB 스키마', src: weddingSchema },
            { name: '스토리지 구조', src: weddingStorage },
        ],
        links: [
            { href: `${import.meta.env.BASE_URL}projects/wedding/wedding-album-generator-presentation.pdf`, label: 'Presentation', icon: 'external' },
        ],
        isTeam: false,
    },
];

const staggerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
            ease: "easeOut",
        },
    },
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
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
            {/* 라이트박스 모달 - 이미지 클릭 시 크게 보기 */}
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
                        onKeyDown={(e) => e.key === 'Escape' && setLightbox(null)}
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
                            <div>
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
                                    <div
                                        className={`visual-grid visual-grid-${project.visuals.length}`}
                                    >
                                        {project.visuals.map((visual) => (
                                            <figure className="visual-card" key={visual.alt}>
                                                {/* macOS 스타일 브라우저 바 */}
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
                                                cursor: 'zoom-in'
                                            }}
                                            onClick={() => setLightbox({ src: artifact.src!, alt: artifact.name })}
                                        />
                                    ) : (
                                        <div className="artifact-placeholder">
                                            다이어그램 영역
                                        </div>
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

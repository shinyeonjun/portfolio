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

export const projects: Project[] = [
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
            {
                href: `${import.meta.env.BASE_URL}projects/meeting/meeting-overlay-assistant-presentation.pdf`,
                label: 'Presentation',
                icon: 'external',
            },
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
            { name: 'ERD', src: scheduleErd },
        ],
        links: [
            { href: 'https://github.com/shinyeonjun/ai-schedule-web', label: 'GitHub', icon: 'github' },
            {
                href: `${import.meta.env.BASE_URL}projects/schedule/ai-schedule-web-presentation.pdf`,
                label: 'Presentation',
                icon: 'external',
            },
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
            {
                href: `${import.meta.env.BASE_URL}projects/controldock/controldock-presentation.pdf`,
                label: 'Presentation',
                icon: 'external',
            },
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
            {
                href: `${import.meta.env.BASE_URL}projects/wedding/wedding-album-generator-presentation.pdf`,
                label: 'Presentation',
                icon: 'external',
            },
        ],
        isTeam: false,
    },
];

const quickNavLabels: Record<string, string> = {
    'de-pipeline': 'DE-pipeline',
    caps: 'Meeting AI',
    'ai-schedule': 'AI Schedule',
    'control-dock': 'ControlDock',
    'wedding-album': 'Wedding Album',
};

export const classicProjectItems = projects.map((project) => ({
    id: project.id,
    label: quickNavLabels[project.id] ?? project.title,
}));

const timelineProjectIds = [
    'ai-schedule',
    'wedding-album',
    'control-dock',
    'de-pipeline',
    'caps',
] as const;

export const timelineProjects = timelineProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);

export const timelineProjectItems = timelineProjects.map((project) => ({
    id: project.id,
    label: quickNavLabels[project.id] ?? project.title,
}));

import deDashboard from '../assets/projects/de/de-dashboard.webp';
import deChart from '../assets/projects/de/de-chart.webp';
import deChat from '../assets/projects/de/de-chat.webp';
import deArchitecture from '../assets/projects/de/de-architecture.svg';
import deDataflow from '../assets/projects/de/de-dataflow.svg';
import deChatbotArchitecture from '../assets/projects/de/de-chatbot-architecture.svg';
import capsOverlay from '../assets/projects/meeting/caps-overlay.webp';
import meetingSystemOverview from '../assets/projects/meeting/meeting-system-overview.webp';
import meetingArchitecture from '../assets/projects/meeting/meeting-cs-architecture.webp';
import meetingSttPoc from '../assets/projects/meeting/meeting-stt-poc.webp';
import scheduleLogin from '../assets/projects/schedule/schedule-login.webp';
import scheduleAnalysis from '../assets/projects/schedule/schedule-analysis.webp';
import scheduleGroup from '../assets/projects/schedule/schedule-group.webp';
import scheduleErd from '../assets/projects/schedule/schedule-erd.webp';
import scheduleArchitecture from '../assets/projects/schedule/schedule-architecture.webp';
import scheduleOutputFlow from '../assets/projects/schedule/schedule-output-flow.svg';
import controlDockDashboard from '../assets/projects/controldock/controldock-dashboard.webp';
import controlDockAgentUi from '../assets/projects/controldock/controldock-agent-ui.webp';
import controlDockDeploymentUi from '../assets/projects/controldock/controldock-deployment-ui.webp';
import controlDockArchitecture from '../assets/projects/controldock/controldock-architecture.webp';
import controlDockDbDesign from '../assets/projects/controldock/controldock-db-design.webp';
import controlDockSequence from '../assets/projects/controldock/controldock-sequence.webp';
import weddingTitle from '../assets/projects/wedding/wedding-title.webp';
import weddingBride from '../assets/projects/wedding/wedding-bride.webp';
import weddingPhotobooth from '../assets/projects/wedding/wedding-photobooth.webp';
import weddingDesign from '../assets/projects/wedding/wedding-design.webp';
import weddingSchema from '../assets/projects/wedding/wedding-schema.webp';
import weddingStorage from '../assets/projects/wedding/wedding-storage.webp';

export type Project = {
    id: string;
    title: string;
    period: string;
    summary: string;
    cardSummary: string;
    stack: string[];
    role: string;
    problem: string;
    solution: string;
    result: string;
    backendPoints: string[];
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
        cardSummary: '유튜브 데이터 ELT 파이프라인',
        stack: ['Python', 'YouTube API', 'GCP', 'Supabase', 'FastAPI', 'RAG'],
        role: '데이터 수집부터 ELT 흐름, 대시보드, 챗봇 연결까지 전반을 직접 구현',
        problem:
            '수집 데이터, 시각화, 질의응답이 각각 따로 놀면 데이터 활용 흐름이 끊기고 분석 결과를 바로 쓰기 어렵다는 문제가 있었습니다.',
        solution:
            'YouTube 수집부터 ELT 파이프라인, 대시보드, RAG 기반 챗봇 응답 구조를 하나의 흐름으로 묶어 end-to-end 데이터 활용 구조를 설계했습니다.',
        result:
            '수집한 데이터를 차트 시각화와 챗봇 응답까지 연결하는 데이터 파이프라인 프로토타입을 구현했습니다.',
        backendPoints: ['ELT 파이프라인', 'Supabase 스키마', 'FastAPI 응답 구조', 'RAG 질의 흐름'],
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
        cardSummary: '로컬 AI 회의 보조 시스템',
        stack: ['Python', 'FastAPI', 'WebSocket', 'Tauri 2', 'React', 'PostgreSQL', 'pgvector', 'Redis'],
        role: '오버레이 클라이언트, 실시간 통신 서버, 워크스페이스 흐름을 설계하고 STT 모델 배치, 이벤트 추출 구조, 회의 기록 저장 방식을 정리',
        problem:
            '회의 플랫폼마다 기능과 UI가 달라 실시간 기록과 회의 후속 업무 흐름이 분절되는 문제가 있었습니다.',
        solution:
            '플랫폼 독립 오버레이, 하이브리드 STT 전략, 사내 DB 기반 워크스페이스를 묶어 회의 중 보조와 회의 후 기록 활용을 하나의 흐름으로 연결했습니다.',
        result:
            '실시간 자막, 핵심 이벤트, 회의 종료 후 기록 검색까지 이어지는 로컬 AI 회의 시스템 구조를 구현했습니다.',
        backendPoints: ['WebSocket 실시간 통신', 'pgvector 기록 검색', 'PostgreSQL 워크스페이스', 'STT 이벤트 파이프라인'],
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
        summary: 'GPT 기반 일정 추출·등록 자동화 구조와 출력 보정 프로젝트',
        cardSummary: 'GPT 기반 일정 자동화 서비스',
        stack: ['Python', 'FastAPI', 'GPT API', 'Calendar', 'Gmail', 'ICS'],
        role: '출력 구조 설계, 시간 컨텍스트 보정, 일정 등록 흐름 연결을 중심으로 구현',
        problem:
            '자연어 일정 요청은 출력 형식이 흔들리고 시간 해석 오류가 잦아 자동 등록으로 바로 연결하기 어려운 문제가 있었습니다.',
        solution:
            'JSON 템플릿 고정, 현재 시간 컨텍스트 보정, Calendar·Gmail·ICS 연동 흐름으로 일정 추출과 등록 과정을 안정화했습니다.',
        result:
            '자연어 입력을 일정 추출과 등록 자동화로 이어가는 개인 일정 관리 흐름을 구현했습니다.',
        backendPoints: ['FastAPI 라우팅', '출력 validation', 'Calendar·Gmail 연동', '시간 컨텍스트 보정'],
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
            '중앙 서버가 여러 Windows 에이전트 PC와 통신하고 상태를 확인하고, 원격 배포 작업과 사내 공지 전송을 통합 관리하는 원격 모니터링 및 배포 시스템',
        cardSummary: '원격 모니터링 및 배포 시스템',
        stack: ['Python', 'PostgreSQL', 'Docker', 'HTML/CSS/JS', 'TCP/UDP', 'REST API'],
        role: '팀 프로젝트에서 HTTP·TCP·UDP 서버와 백엔드 서비스 로직을 맡아 PC 등록 승인 흐름, 상태 체크, 원격 배포 요청 처리, 공지 전송 프로토콜을 구현',
        problem:
            '여러 PC의 상태 확인, 원격 배포, 공지 전송이 분산되어 운영 흐름이 비효율적이고 추적도 어려운 문제가 있었습니다.',
        solution:
            '중앙 서버에서 HTTP·TCP·UDP 통신을 묶어 등록 승인, 상태 모니터링, 원격 배포, 공지 전송 흐름을 통합했습니다.',
        result:
            '에이전트 등록부터 배포 요청과 브로드캐스트 공지까지 한 화면에서 관리하는 팀 프로젝트 백엔드를 구현했습니다.',
        backendPoints: ['HTTP·TCP·UDP 서버', '배포 요청 처리', 'PostgreSQL 상태 저장', '브로드캐스트 프로토콜'],
        highlights: ['에이전트 등록 및 상태 모니터링', '원격 배포 실행·실시간 상태', '브로드캐스트 공지 및 수신 추적'],
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
            'GPT API로 결혼식 사진을 분석하고, 신랑·신부·스튜디오·야외·본식·포토부스 등 섹션별 앨범 페이지를 자동 생성하는 프로젝트성 시스템',
        cardSummary: '결혼식 웹 앨범 생성 실험',
        stack: ['Python', 'GPT-4o-mini', 'Supabase', 'PostgreSQL', 'HTML'],
        role: '사진 분석 카테고리 설계, 앨범 페이지 구성, Supabase 스토리지/DB 스키마 설계, 발표 자료 제작을 맡아 개인 프로젝트 형태로 진행',
        problem:
            '사진마다 특성이 달라 앨범 구성을 수작업으로 맞추는 데 시간이 오래 걸리고, 저장 구조도 함께 정리할 필요가 있었습니다.',
        solution:
            '사진 속성 분석 규칙과 섹션별 페이지 생성 흐름, Supabase 기반 저장 구조를 함께 설계해 앨범 생성 과정을 자동화했습니다.',
        result:
            '앨범 페이지 생성 흐름과 스토리지·DB 구조를 검증하는 실험형 프로토타입을 만들었습니다.',
        backendPoints: ['Supabase 스토리지', 'PostgreSQL 스키마', 'GPT 분석 흐름', '페이지 생성 규칙'],
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

const timelineProjectIds = ['ai-schedule', 'wedding-album', 'control-dock', 'de-pipeline', 'caps'] as const;

export const timelineProjects = timelineProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);

export const timelineProjectItems = timelineProjects.map((project) => ({
    id: project.id,
    label: quickNavLabels[project.id] ?? project.title,
}));

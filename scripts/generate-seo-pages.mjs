import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://shinyeonjun.github.io/portfolio';
const publicDir = path.resolve(process.cwd(), 'public');
const today = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul',
}).format(new Date());

const projects = [
  {
    slug: 'meeting',
    title: 'Meeting Overlay Assistant',
    period: '2026.03 - 진행 중',
    category: '개인 프로젝트',
    description:
      '회의 플랫폼에 종속되지 않는 오버레이에서 partial/final 자막과 핵심 이벤트를 실시간으로 보조하고, 회의 종료 후에는 사내 DB 기반 워크스페이스에서 기록 검색과 후속 업무까지 이어가는 로컬 AI 회의 시스템입니다.',
    role:
      '오버레이 클라이언트, 실시간 통신 서버, 워크스페이스 구조를 설계하고 STT 모듈 배치, 이벤트 추출 구조, 회의 기록 저장 방식을 직접 정리했습니다.',
    problem:
      '회의 플랫폼마다 기능과 UI가 달라 실시간 기록과 회의 후속 업무 흐름이 끊기는 문제가 있었습니다.',
    solution:
      '플랫폼 독립 오버레이, 하이브리드 STT 전략, 사내 DB 기반 워크스페이스를 하나의 흐름으로 묶어 회의 중 보조와 회의 후 기록 활용을 연결했습니다.',
    result:
      '실시간 자막, 핵심 이벤트 추출, 회의 종료 후 기록 검색까지 이어지는 로컬 AI 회의 시스템 구조를 구현했습니다.',
    highlights: ['플랫폼 독립 오버레이', '하이브리드 STT 전략', '사내 DB 중심 기록 축적'],
    backendPoints: ['WebSocket 실시간 통신', 'pgvector 기록 검색', 'PostgreSQL 워크스페이스', 'STT 이벤트 파이프라인'],
    stack: ['Python', 'FastAPI', 'WebSocket', 'Tauri 2', 'React', 'PostgreSQL', 'pgvector', 'Redis'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shinyeonjun/meeting-overlay-assistant' },
      { label: 'Presentation', href: `${siteUrl}/projects/meeting/meeting-overlay-assistant-presentation.pdf` },
    ],
    keywords:
      '신연준 포트폴리오, 백엔드 개발자 포트폴리오, Meeting Overlay Assistant, FastAPI 프로젝트, WebSocket, STT, PostgreSQL, pgvector, AI 회의 보조 시스템',
  },
  {
    slug: 'de-pipeline',
    title: 'DE-pipeline',
    period: '2026.01 - 2026.02',
    category: '개인 프로젝트',
    description:
      'YouTube 데이터 수집부터 정제, 적재, 대시보드, RAG 기반 챗봇 응답 구조까지 연결한 데이터 파이프라인 프로젝트입니다.',
    role:
      '데이터 수집부터 ELT 흐름, 대시보드, 챗봇 연결까지 전체 구조를 직접 설계하고 구현했습니다.',
    problem:
      '수집 데이터, 시각화, 질의응답이 따로 놀면 데이터 활용 흐름이 끊기고 분석 결과를 바로 확인하기 어려웠습니다.',
    solution:
      'YouTube 수집 파이프라인, ELT 흐름, 대시보드, RAG 기반 챗봇 응답 구조를 하나의 데이터 활용 흐름으로 설계했습니다.',
    result:
      '수집한 데이터를 차트 시각화와 챗봇 응답까지 연결하는 end-to-end 데이터 파이프라인 프로토타입을 구현했습니다.',
    highlights: ['ELT 흐름 설계', '데이터 기반 챗봇', '차트 시각화'],
    backendPoints: ['ELT 파이프라인', 'Supabase 스키마', 'FastAPI 응답 구조', 'RAG 질의 흐름'],
    stack: ['Python', 'YouTube API', 'GCP', 'Supabase', 'FastAPI', 'RAG'],
    links: [{ label: 'GitHub', href: 'https://github.com/shinyeonjun/DE-pipeline' }],
    keywords:
      '신연준 포트폴리오, 데이터 파이프라인 포트폴리오, DE-pipeline, ELT, FastAPI, RAG, YouTube API, GCP, Supabase',
  },
  {
    slug: 'schedule',
    title: 'AI Schedule Web',
    period: '2025.05 - 2025.10',
    category: '개인 프로젝트',
    description:
      'GPT 기반 일정 추출과 자동 등록 흐름에 JSON 출력 보정, Calendar와 Gmail 연동을 더한 일정 자동화 프로젝트입니다.',
    role:
      '출력 구조 설계, 시간 컨텍스트 보정, 일정 등록 흐름 연결을 중심으로 구현했습니다.',
    problem:
      '자연어 일정 요청은 출력 형식이 흔들리고 시간 해석 오류가 많아 자동 등록으로 바로 연결하기 어려웠습니다.',
    solution:
      'JSON 템플릿 고정, 현재 시간 컨텍스트 보정, Calendar·Gmail·ICS 연동 흐름으로 일정 추출과 등록 과정을 안정화했습니다.',
    result:
      '자연어 입력에서 일정 추출과 등록 자동화까지 이어지는 개인 일정 관리 흐름을 구현했습니다.',
    highlights: ['JSON 템플릿 고정', '현재 시간 보정', 'Calendar·Gmail 연동'],
    backendPoints: ['FastAPI 라우터', '출력 validation', 'Calendar·Gmail 연동', '시간 컨텍스트 보정'],
    stack: ['Python', 'FastAPI', 'GPT API', 'Calendar', 'Gmail', 'ICS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shinyeonjun/ai-schedule-web' },
      { label: 'Presentation', href: `${siteUrl}/projects/schedule/ai-schedule-web-presentation.pdf` },
    ],
    keywords:
      '신연준 포트폴리오, FastAPI 포트폴리오, AI Schedule Web, 일정 자동화, GPT API, Calendar 연동, Gmail 연동, ICS',
  },
  {
    slug: 'controldock',
    title: 'ControlDock',
    period: '2025.12',
    category: '팀 프로젝트',
    description:
      '여러 Windows 에이전트 PC의 상태 확인, 원격 배포, 공지 브로드캐스트를 통합 관리하는 원격 모니터링 및 배포 시스템입니다.',
    role:
      'HTTP·TCP·UDP 서버와 백엔드 서비스 로직을 맡아 PC 등록 확인 흐름, 상태 체크, 원격 배포 요청 처리, 공지 전송 프로토콜을 구현했습니다.',
    problem:
      '여러 PC의 상태 확인, 원격 배포, 공지 전송이 분산되어 운영 흐름이 비효율적이고 추적이 어려웠습니다.',
    solution:
      '중앙 서버에서 HTTP·TCP·UDP 통신을 묶어 등록 확인, 상태 모니터링, 원격 배포, 공지 전송 흐름을 통합했습니다.',
    result:
      '에이전트 등록부터 배포 요청과 브로드캐스트 공지까지 하나의 화면에서 관리하는 팀 프로젝트 백엔드를 구현했습니다.',
    highlights: ['에이전트 등록 및 상태 모니터링', '원격 배포 실행·실시간 상태', '브로드캐스트 공지 및 수신 추적'],
    backendPoints: ['HTTP·TCP·UDP 서버', '배포 요청 처리', 'PostgreSQL 상태 저장', '브로드캐스트 프로토콜'],
    stack: ['Python', 'PostgreSQL', 'Docker', 'HTML/CSS/JS', 'TCP/UDP', 'REST API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shinyeonjun/ControlDock' },
      { label: 'Presentation', href: `${siteUrl}/projects/controldock/controldock-presentation.pdf` },
    ],
    keywords:
      '신연준 포트폴리오, 팀 프로젝트 포트폴리오, ControlDock, 원격 배포 시스템, 모니터링 시스템, Python 서버, TCP UDP, REST API',
  },
  {
    slug: 'wedding',
    title: 'Wedding Album Generator',
    period: '2025.06',
    category: '개인 프로젝트',
    description:
      '결혼식 사진을 분석해 섹션별 웹 앨범 페이지를 자동 생성하는 실험형 프로젝트입니다.',
    role:
      '사진 분석 카테고리 규칙, 웹 페이지 구성, Supabase 스토리지와 DB 구조 설계, 발표 자료 제작을 맡았습니다.',
    problem:
      '사진마다 특성이 달라 웹 앨범 구성을 손작업으로 맞추는 데 시간이 오래 걸리고, 결과 구조를 반복 정리할 필요가 있었습니다.',
    solution:
      '사진 속성 분석 규칙과 섹션별 페이지 생성 흐름, Supabase 기반 저장 구조를 함께 설계해 웹 앨범 생성 과정을 자동화했습니다.',
    result:
      '웹 페이지 생성 흐름과 스토리지·DB 구조를 검증하는 실험형 프로토타입을 만들었습니다.',
    highlights: ['사진 속성 분석', '웹 페이지 자동 생성', 'Supabase 스키마 설계'],
    backendPoints: ['Supabase 스토리지', 'PostgreSQL 스키마', 'GPT 분석 흐름', '페이지 생성 규칙'],
    stack: ['Python', 'GPT-4o-mini', 'Supabase', 'PostgreSQL', 'HTML'],
    links: [
      { label: 'Presentation', href: `${siteUrl}/projects/wedding/wedding-album-generator-presentation.pdf` },
    ],
    keywords:
      '신연준 포트폴리오, 개인 프로젝트 포트폴리오, Wedding Album Generator, GPT-4o-mini, Supabase, 사진 분석, 웹 생성',
  },
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderChipList(items, className = 'chip-list') {
  return items.map((item) => `<span class="${className}__item">${escapeHtml(item)}</span>`).join('');
}

function renderLinkList(items) {
  return items
    .map(
      (item) =>
        `<a class="chip-link" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${escapeHtml(item.label)}</a>`,
    )
    .join('');
}

function renderProjectPage(project) {
  const canonical = `${siteUrl}/projects/${project.slug}/`;
  const title = `${project.title} | 신연준 포트폴리오`;
  const summary = `${project.title} 프로젝트 소개입니다. ${project.description}`;

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(summary)}" />
    <meta name="keywords" content="${escapeHtml(project.keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="ko_KR" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(summary)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/og-cover.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(summary)}" />
    <meta name="twitter:image" content="${siteUrl}/og-cover.png" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${escapeHtml(title)}",
        "description": "${escapeHtml(summary)}",
        "author": {
          "@type": "Person",
          "name": "신연준",
          "url": "${siteUrl}/"
        },
        "dateModified": "${today}",
        "mainEntityOfPage": "${canonical}",
        "about": ["${project.stack.map((item) => escapeHtml(item)).join('", "')}"]
      }
    </script>
    <style>
      :root {
        color-scheme: light;
        --bg: #f8fafc;
        --panel: rgba(255, 255, 255, 0.94);
        --line: rgba(203, 213, 225, 0.82);
        --text: #0f172a;
        --muted: #475569;
        --accent: #2563eb;
        --accent-soft: rgba(239, 246, 255, 0.92);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
        background:
          radial-gradient(circle at top, rgba(191, 219, 254, 0.36), transparent 32%),
          var(--bg);
        color: var(--text);
        line-height: 1.68;
        word-break: keep-all;
      }

      main {
        width: min(1040px, calc(100% - 2rem));
        margin: 0 auto;
        padding: 3.25rem 0 4.5rem;
      }

      .crumb,
      .home-link {
        color: var(--accent);
        text-decoration: none;
        font-weight: 700;
      }

      .crumb {
        font-size: 0.92rem;
      }

      .hero {
        display: grid;
        gap: 1rem;
        margin-top: 1.1rem;
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 1.75rem;
        background: var(--panel);
        box-shadow: 0 30px 60px -50px rgba(15, 23, 42, 0.3);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 0.28rem 0.72rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.4rem);
        line-height: 1.06;
        letter-spacing: -0.04em;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        color: var(--muted);
        font-size: 0.95rem;
      }

      .meta span {
        display: inline-flex;
        align-items: center;
        padding: 0.22rem 0.72rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.9);
      }

      .summary {
        margin: 0;
        color: var(--muted);
        font-size: 1.04rem;
      }

      .proof-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1.15rem;
      }

      .panel {
        display: grid;
        gap: 0.6rem;
        padding: 1.25rem;
        border: 1px solid var(--line);
        border-radius: 1.25rem;
        background: rgba(255, 255, 255, 0.92);
      }

      .panel h2 {
        margin: 0;
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #94a3b8;
      }

      .panel p {
        margin: 0;
        color: var(--muted);
      }

      .focus-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }

      .stack-panel {
        grid-column: 1 / -1;
      }

      .chip-list,
      .link-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .chip-list__item,
      .chip-link {
        display: inline-flex;
        align-items: center;
        padding: 0.34rem 0.76rem;
        border-radius: 999px;
        border: 1px solid rgba(191, 219, 254, 0.95);
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 0.82rem;
        font-weight: 700;
        text-decoration: none;
      }

      .home-link {
        display: inline-flex;
        margin-top: 1.5rem;
      }

      @media (max-width: 780px) {
        main {
          width: min(100% - 1.2rem, 1040px);
          padding-top: 2rem;
        }

        .hero {
          padding: 1.35rem;
          border-radius: 1.25rem;
        }

        .proof-grid,
        .focus-grid {
          grid-template-columns: 1fr;
        }

        .stack-panel {
          grid-column: auto;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <a class="crumb" href="${siteUrl}/">신연준 포트폴리오</a>

      <section class="hero">
        <span class="eyebrow">${escapeHtml(project.category)}</span>
        <h1>${escapeHtml(project.title)}</h1>
        <div class="meta">
          <span>${escapeHtml(project.period)}</span>
          <span>백엔드 · 데이터 파이프라인 · FastAPI 프로젝트</span>
        </div>
        <p class="summary">${escapeHtml(project.description)}</p>
      </section>

      <section class="proof-grid" aria-label="프로젝트 요약">
        <article class="panel">
          <h2>문제</h2>
          <p>${escapeHtml(project.problem)}</p>
        </article>
        <article class="panel">
          <h2>해결</h2>
          <p>${escapeHtml(project.solution)}</p>
        </article>
        <article class="panel">
          <h2>내 역할</h2>
          <p>${escapeHtml(project.role)}</p>
        </article>
        <article class="panel">
          <h2>결과</h2>
          <p>${escapeHtml(project.result)}</p>
        </article>
      </section>

      <section class="focus-grid" aria-label="프로젝트 포인트">
        <article class="panel">
          <h2>핵심 포인트</h2>
          <div class="chip-list">${renderChipList(project.highlights)}</div>
        </article>
        <article class="panel">
          <h2>백엔드 포인트</h2>
          <div class="chip-list">${renderChipList(project.backendPoints)}</div>
        </article>
        <article class="panel stack-panel">
          <h2>기술 스택</h2>
          <div class="chip-list">${renderChipList(project.stack)}</div>
        </article>
        <article class="panel stack-panel">
          <h2>관련 링크</h2>
          <div class="link-list">${renderLinkList(project.links)}</div>
        </article>
      </section>

      <a class="home-link" href="${siteUrl}/#projects">메인 포트폴리오에서 프로젝트 보기</a>
    </main>
  </body>
</html>`;
}

async function main() {
  for (const project of projects) {
    const targetDir = path.join(publicDir, 'projects', project.slug);
    await mkdir(targetDir, { recursive: true });
    await writeFile(path.join(targetDir, 'index.html'), renderProjectPage(project), 'utf8');
  }

  const sitemapEntries = [
    {
      loc: `${siteUrl}/`,
      changefreq: 'weekly',
      priority: '1.0',
    },
    ...projects.map((project) => ({
      loc: `${siteUrl}/projects/${project.slug}/`,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
}

await main();

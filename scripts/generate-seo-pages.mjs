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
      '오버레이 클라이언트, 실시간 통신 서버, 워크스페이스 흐름을 설계하고 STT 모델 배치, 이벤트 추출 구조, 회의 기록 저장 방식을 정리했습니다.',
    highlights: ['플랫폼 독립 오버레이', '하이브리드 STT 전략', '사내 DB 중심 기록 축적'],
    stack: ['Python', 'FastAPI', 'WebSocket', 'Tauri 2', 'React', 'PostgreSQL', 'pgvector', 'Redis'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shinyeonjun/meeting-overlay-assistant' },
      { label: 'Presentation', href: `${siteUrl}/projects/meeting/meeting-overlay-assistant-presentation.pdf` },
    ],
    keywords:
      'Meeting Overlay Assistant, 백엔드 프로젝트, FastAPI 프로젝트, STT, 회의 보조 AI, 로컬 AI, PostgreSQL, pgvector',
  },
  {
    slug: 'de-pipeline',
    title: 'DE-pipeline',
    period: '2026.01 - 2026.02',
    category: '개인 프로젝트',
    description:
      'YouTube 데이터 수집·정제·적재와 대시보드·챗봇 응답 구조를 연결한 데이터 파이프라인 프로젝트입니다.',
    role:
      '데이터 수집부터 ELT 흐름, 대시보드, 챗봇 연결까지 전체 구조를 직접 설계하고 구현했습니다.',
    highlights: ['ELT 흐름 설계', '데이터 기반 챗봇', '차트 시각화'],
    stack: ['Python', 'YouTube API', 'GCP', 'Supabase', 'FastAPI', 'RAG'],
    links: [{ label: 'GitHub', href: 'https://github.com/shinyeonjun/DE-pipeline' }],
    keywords:
      '데이터 파이프라인 포트폴리오, DE-pipeline, ELT, FastAPI, RAG, YouTube API, GCP, Supabase',
  },
  {
    slug: 'schedule',
    title: 'AI Schedule Web',
    period: '2025.05 - 2025.10',
    category: '개인 프로젝트',
    description:
      'GPT 기반 일정 추출과 등록 자동화, JSON 출력 보정, Calendar와 Gmail 연동을 포함한 일정 자동화 프로젝트입니다.',
    role:
      '출력 구조 설계, 시간 컨텍스트 보정, 일정 등록 흐름 연결을 중심으로 구현했습니다.',
    highlights: ['JSON 템플릿 고정', '현재 시간 보정', 'Calendar·메일 연동'],
    stack: ['Python', 'FastAPI', 'GPT API', 'Calendar', 'Gmail', 'ICS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shinyeonjun/ai-schedule-web' },
      { label: 'Presentation', href: `${siteUrl}/projects/schedule/ai-schedule-web-presentation.pdf` },
    ],
    keywords:
      'AI Schedule Web, FastAPI 포트폴리오, 일정 자동화, GPT API, 캘린더 자동화, Gmail 연동, ICS',
  },
  {
    slug: 'controldock',
    title: 'ControlDock',
    period: '2025.12',
    category: '팀 프로젝트',
    description:
      '여러 Windows 에이전트 PC의 상태 확인, 원격 배포, 공지 브로드캐스트를 통합 관리하는 원격 모니터링 및 배포 시스템입니다.',
    role:
      'HTTP·TCP·UDP 서버와 백엔드 서비스 로직을 맡아 PC 등록 승인, 상태 체크, 원격 배포 요청 처리, 공지 전송 프로토콜을 구현했습니다.',
    highlights: ['에이전트 등록 및 상태 모니터링', '원격 배포 실행·실시간 상태', '브로드캐스트 공지 및 수신 추적'],
    stack: ['Python', 'PostgreSQL', 'Docker', 'HTML/CSS/JS', 'TCP/UDP', 'REST API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shinyeonjun/ControlDock' },
      { label: 'Presentation', href: `${siteUrl}/projects/controldock/controldock-presentation.pdf` },
    ],
    keywords:
      'ControlDock, 팀 프로젝트 포트폴리오, 원격 배포 시스템, 모니터링 시스템, Python 서버, TCP UDP, REST API',
  },
  {
    slug: 'wedding',
    title: 'Wedding Album Generator',
    period: '2025.06',
    category: '개인 프로젝트',
    description:
      '결혼식 사진을 분석하고 앨범 페이지를 자동 생성하는 실험형 프로젝트입니다.',
    role:
      '사진 분석 카테고리 설계, 앨범 페이지 구성, Supabase 스토리지와 DB 구조 설계, 발표 자료 제작을 맡았습니다.',
    highlights: ['사진 속성 분석', '앨범 페이지 자동 생성', 'Supabase 스키마 설계'],
    stack: ['Python', 'GPT-4o-mini', 'Supabase', 'PostgreSQL', 'HTML'],
    links: [
      { label: 'Presentation', href: `${siteUrl}/projects/wedding/wedding-album-generator-presentation.pdf` },
    ],
    keywords:
      'Wedding Album Generator, 개인 프로젝트 포트폴리오, GPT-4o-mini, Supabase, 사진 분석, 앨범 생성',
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

function renderProjectPage(project) {
  const canonical = `${siteUrl}/projects/${project.slug}/`;
  const title = `${project.title} | 신연준 포트폴리오`;
  const summary = `${project.title} 프로젝트 소개입니다. ${project.description}`;
  const keywordList = escapeHtml(project.keywords);
  const highlightItems = project.highlights
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');
  const stackItems = project.stack
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');
  const linkItems = project.links
    .map(
      (link) =>
        `<a class="link-chip" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`,
    )
    .join('');

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(summary)}" />
    <meta name="keywords" content="${keywordList}" />
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
        --line: rgba(203, 213, 225, 0.78);
        --text: #0f172a;
        --muted: #475569;
        --accent: #2563eb;
        --accent-soft: #eff6ff;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
        background:
          radial-gradient(circle at top, rgba(191, 219, 254, 0.35), transparent 34%),
          var(--bg);
        color: var(--text);
        line-height: 1.7;
      }

      main {
        width: min(960px, calc(100% - 2rem));
        margin: 0 auto;
        padding: 3.5rem 0 5rem;
      }

      .crumb {
        color: var(--muted);
        font-size: 0.92rem;
        text-decoration: none;
      }

      .hero {
        margin-top: 1.25rem;
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 1.75rem;
        background: var(--panel);
        box-shadow: 0 28px 60px -50px rgba(15, 23, 42, 0.32);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.25rem 0.7rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 0.74rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      h1 {
        margin: 1rem 0 0.75rem;
        font-size: clamp(2rem, 5vw, 3.25rem);
        line-height: 1.08;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-bottom: 1rem;
        color: var(--muted);
        font-size: 0.95rem;
      }

      .meta span {
        display: inline-flex;
        align-items: center;
        padding: 0.18rem 0.7rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: #ffffff;
      }

      .summary {
        margin: 0;
        color: var(--muted);
        font-size: 1.02rem;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }

      .panel {
        padding: 1.35rem;
        border: 1px solid var(--line);
        border-radius: 1.35rem;
        background: rgba(255, 255, 255, 0.9);
      }

      h2 {
        margin: 0 0 0.7rem;
        font-size: 1.05rem;
      }

      ul {
        margin: 0;
        padding-left: 1.15rem;
        color: var(--muted);
      }

      .stack-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        padding: 0;
        list-style: none;
      }

      .stack-list li,
      .link-chip {
        display: inline-flex;
        align-items: center;
        padding: 0.3rem 0.75rem;
        border-radius: 999px;
        background: var(--accent-soft);
        border: 1px solid rgba(191, 219, 254, 0.88);
        color: var(--accent);
        font-size: 0.82rem;
        font-weight: 600;
        text-decoration: none;
      }

      .links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
      }

      .home-link {
        display: inline-flex;
        margin-top: 1.5rem;
        color: var(--accent);
        text-decoration: none;
        font-weight: 700;
      }

      @media (max-width: 780px) {
        main { width: min(100% - 1.2rem, 960px); padding-top: 2rem; }
        .hero { padding: 1.35rem; border-radius: 1.25rem; }
        .grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main>
      <a class="crumb" href="${siteUrl}/">← 신연준 포트폴리오</a>
      <section class="hero">
        <span class="eyebrow">${escapeHtml(project.category)}</span>
        <h1>${escapeHtml(project.title)}</h1>
        <div class="meta">
          <span>${escapeHtml(project.period)}</span>
          <span>신연준 포트폴리오 프로젝트 상세</span>
        </div>
        <p class="summary">${escapeHtml(project.description)}</p>
      </section>

      <div class="grid">
        <section class="panel">
          <h2>내 역할</h2>
          <p>${escapeHtml(project.role)}</p>
        </section>
        <section class="panel">
          <h2>핵심 포인트</h2>
          <ul>${highlightItems}</ul>
        </section>
        <section class="panel">
          <h2>기술 스택</h2>
          <ul class="stack-list">${stackItems}</ul>
        </section>
        <section class="panel">
          <h2>관련 링크</h2>
          <div class="links">${linkItems}</div>
        </section>
      </div>

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

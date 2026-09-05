import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  Terminal,
  Database,
  MessageSquare,
  CalendarDays,
  SlidersHorizontal,
  BookHeart,
  ArrowLeft,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Maximize2,
  Mail,
  Github,
} from "lucide-react";
import { projects, type Project } from "./projectData";
import "./PocketPortfolio.css";

const ax: Project = {
  id: "ax-studio",
  title: "AX-Studio",
  period: "개선 중",
  summary:
    "AI가 일하는 공간과 사람이 이해하고 개입할 수 있는 흐름을 만드는 현재 작업입니다.",
  cardSummary: "AI와 함께 일하는 공간",
  role: "직접 만들고 사용하면서 작업 흐름을 다듬고 있습니다.",
  problem:
    "AI에게 작업을 맡기는 과정에서 사람이 진행 상황을 이해하고 개입할 수 있는 구조에 관심이 있습니다.",
  solution: "실제로 실행해 보고, 관찰한 문제를 다음 개선으로 이어갑니다.",
  result: "현재 개선 중입니다.",
  evidence: "",
  stack: [],
  highlights: [],
  backendPoints: [],
  visuals: [],
  artifacts: [],
  links: [],
};
const library = [ax, ...projects];
const colors = [
  "#798566",
  "#b76e60",
  "#6c8ca4",
  "#668f91",
  "#93809e",
  "#b17a88",
];
const icons = [
  Terminal,
  Database,
  MessageSquare,
  CalendarDays,
  SlidersHorizontal,
  BookHeart,
];
const names = [
  "AX-Studio",
  "DE-pipeline",
  "Meeting Overlay",
  "AI Schedule",
  "ControlDock",
  "Wedding Album",
];
const labels = [
  "개선 중",
  "개인 공부",
  "수업 프로젝트",
  "수업 프로젝트",
  "수업 프로젝트",
  "수업 프로젝트",
];
const tabs = ["소개", "만든 과정", "화면 · 설계"];
type Page = "projects" | "detail" | "about" | "contact";
function readLocation(): { page: Page; selected: number } {
  const route = window.location.hash.slice(1);
  const selected = library.findIndex((p) => route === `project/${p.id}`);
  if (selected >= 0) return { page: "detail", selected };
  return {
    page: route === "about" || route === "contact" ? route : "projects",
    selected: 0,
  };
}

export default function PocketPortfolio() {
  const [initial] = useState(readLocation);
  const [page, setPage] = useState<Page>(initial.page);
  const [selected, setSelected] = useState(initial.selected);
  const [tab, setTab] = useState(0);
  const [picture, setPicture] = useState(0);
  const [sound, setSound] = useState(false);
  const [copied, setCopied] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const project = library[selected];
  const pictures = [
    ...project.visuals,
    ...project.artifacts.flatMap((a) =>
      a.src ? [{ src: a.src, alt: a.name }] : [],
    ),
  ];
  const activeImage = pictures[picture];
  const beep = useCallback(() => {
    if (!sound) return;
    try {
      const context = audioRef.current ?? new AudioContext();
      audioRef.current = context;
      void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = 520;
      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.055,
      );
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.06);
    } catch {
      /* Sound is optional; browsing remains available. */
    }
  }, [sound]);
  const navigate = useCallback(
    (next: Page, index = selected) => {
      beep();
      setPage(next);
      setSelected(index);
      setTab(0);
      setPicture(0);
      const hash = next === "detail" ? `project/${library[index].id}` : next;
      if (location.hash !== `#${hash}`) history.pushState(null, "", `#${hash}`);
      contentRef.current?.scrollTo(0, 0);
    },
    [beep, selected],
  );
  const move = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      beep();
      if (page === "projects") {
        const columns = gridRef.current
          ? getComputedStyle(gridRef.current).gridTemplateColumns.split(" ")
              .length
          : 3;
        const delta =
          direction === "left"
            ? -1
            : direction === "right"
              ? 1
              : direction === "up"
                ? -columns
                : columns;
        const next = (selected + delta + library.length) % library.length;
        setSelected(next);
        (
          gridRef.current?.children[next] as HTMLButtonElement | undefined
        )?.focus({ preventScroll: true });
      } else if (
        page === "detail" &&
        (direction === "left" || direction === "right")
      ) {
        setTab((t) => (t + (direction === "left" ? 2 : 1)) % 3);
        contentRef.current?.scrollTo(0, 0);
      } else
        contentRef.current?.scrollBy({ top: direction === "up" ? -180 : 180 });
    },
    [beep, page, selected],
  );
  const confirm = useCallback(() => {
    if (page === "projects") navigate("detail");
    else if (page === "detail" && tab === 2 && activeImage) {
      beep();
      dialogRef.current?.showModal();
    }
  }, [page, navigate, tab, activeImage, beep]);
  const back = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    else navigate("projects");
  }, [navigate]);
  useEffect(() => {
    const restore = () => {
      const state = readLocation();
      setPage(state.page);
      setSelected(state.selected);
      setTab(0);
      setPicture(0);
    };
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
    };
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return;
      const element = event.target as HTMLElement;
      if (element.closest('input, textarea, select') || element.isContentEditable)
        return;
      const key = event.key.toLowerCase();
      if (key === "backspace") {
        event.preventDefault();
        back();
        return;
      }
      if (dialogRef.current?.open) return;
      const directions: Record<string, "left" | "right" | "up" | "down"> = {
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
      };
      if (directions[key]) {
        event.preventDefault();
        move(directions[key]);
      } else if (key === "escape") {
        event.preventDefault();
        back();
      } else if (key === "enter" && !element.closest("button, a")) {
        event.preventDefault();
        confirm();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, back, confirm]);
  useEffect(() => {
    document.title = `${page === "detail" ? project.title : "신연준"} | 포켓 포트폴리오`;
  }, [page, project.title]);
  useEffect(() => {
    document.getElementById("console-screen")?.focus({ preventScroll: true });
  }, [page]);
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      void audioRef.current?.close();
    },
    [],
  );
  useEffect(() => {
    if (page === "projects")
      gridRef.current?.children[selected]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
  }, [selected, page]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("sinyeonjun@gmail.com");
      setCopied("이메일을 복사했어요.");
    } catch {
      setCopied("복사하지 못했어요. 아래 이메일 주소를 직접 선택해 주세요.");
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(""), 4000);
  };
  return (
    <div className="pocket-page">
      <a className="pocket-skip" href="#console-screen">
        프로젝트 화면으로 바로가기
      </a>
      <header className="desk-heading">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            navigate("projects");
          }}
        >
          신연준 <span>개발 기록 보관함</span>
        </a>
        <span>작은 칩에 담은, 만들었던 것들.</span>
      </header>
      <main className="handheld" aria-label="신연준의 포트폴리오 게임기">
        <header className="device-top">
          <span>
            YEONJUN <b>/</b> POCKET PORTFOLIO
          </span>
          <button onClick={() => setSound((s) => !s)} aria-pressed={sound}>
            {sound ? <Volume2 size={14} /> : <VolumeX size={14} />} SOUND{" "}
            {sound ? "ON" : "OFF"}
          </button>
        </header>
        <aside className="left-controls" aria-label="방향 조작">
          <div className="power">
            <i /> POWER
          </div>
          <div className="dpad">
            {(["up", "left", "right", "down"] as const).map((d, i) => (
              <button
                className={d}
                key={d}
                onClick={() => move(d)}
                aria-label={`${["위", "왼쪽", "오른쪽", "아래"][i]}로 이동`}
              >
                {["▲", "◀", "▶", "▼"][i]}
              </button>
            ))}
            <span />
          </div>
          <div className="speaker" aria-hidden="true" />
        </aside>
        <section className="screen-bezel">
          <div className="screen" id="console-screen" tabIndex={-1}>
            <div className="screen-top">
              <span>
                {page === "detail"
                  ? `PROJECT / ${String(selected + 1).padStart(2, "0")}`
                  : "PLAYER 01 / 신연준"}
              </span>
              <span>{page === "projects" ? "06 CARTRIDGES" : "SAVE FILE"}</span>
            </div>
            <div
              className="screen-content"
              ref={contentRef}
              key={`${page}-${page === "detail" ? selected : ""}`}
            >
              {page === "projects" ? (
                <>
                  <div className="library-heading">
                    <h1>프로젝트를 골라주세요</h1>
                    <p>직접 만들고, 부딪히고, 배운 것들.</p>
                  </div>
                  <div
                    className="cartridge-grid"
                    ref={gridRef}
                    aria-label="프로젝트 칩 목록"
                  >
                    {library.map((p, i) => {
                      const Icon = icons[i];
                      return (
                        <button
                          key={p.id}
                          className={`cartridge ${i === selected ? "selected" : ""}`}
                          style={{ "--chip": colors[i] } as CSSProperties}
                          onFocus={() => setSelected(i)}
                          onClick={() => navigate("detail", i)}
                          aria-label={`${names[i]}, ${labels[i]} 열기`}
                          aria-current={selected === i ? "true" : undefined}
                        >
                          <span className="chip-ridge">
                            <span>{String(i + 1).padStart(2, "0")}</span>
                            <i />
                          </span>
                          <span className="chip-label">
                            <Icon
                              className="chip-icon"
                              size={29}
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                            <strong>{names[i]}</strong>
                            <small className={`badge badge-${i}`}>
                              {labels[i]}
                            </small>
                          </span>
                          <span className="chip-contacts" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="selection-note" aria-live="polite">
                    <span>▶</span>
                    <p>
                      <strong>{names[selected]}</strong> {project.cardSummary}
                    </p>
                  </div>
                </>
              ) : null}
              {page === "detail" ? (
                <article className="project-detail">
                  <button className="text-button" onClick={back}>
                    <ArrowLeft size={14} /> 칩 목록
                  </button>
                  <div className="detail-title">
                    <h1>{project.title}</h1>
                    <span className={`badge badge-${selected}`}>
                      {labels[selected]}
                    </span>
                  </div>
                  <div className="detail-meta">
                    {project.period}
                    {project.isTeam ? " · 팀 프로젝트" : ""}
                  </div>
                  <div
                    className="detail-tabs"
                    role="tablist"
                    aria-label="프로젝트 정보"
                  >
                    {tabs.map((t, i) => (
                      <button
                        key={t}
                        role="tab"
                        id={`detail-tab-${i}`}
                        aria-selected={i === tab}
                        aria-controls="detail-panel"
                        onClick={() => {
                          setTab(i);
                          beep();
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div
                    id="detail-panel"
                    role="tabpanel"
                    aria-labelledby={`detail-tab-${tab}`}
                  >
                    {tab === 0 ? (
                      <>
                        <p className="project-summary">{project.summary}</p>
                        <h2>내가 한 일</h2>
                        <p>{project.role}</p>
                        <h2>현재 결과</h2>
                        <p>{project.result}</p>
                        {project.stack.length > 0 && (
                          <div className="tech-tags">
                            {project.stack.map((s) => (
                              <span key={s}>{s}</span>
                            ))}
                          </div>
                        )}
                      </>
                    ) : null}
                    {tab === 1 ? (
                      <>
                        <h2>시작한 이유</h2>
                        <p>{project.problem}</p>
                        <h2>선택한 방법</h2>
                        <p>{project.solution}</p>
                        {project.evidence && (
                          <>
                            <h2>확인한 근거</h2>
                            <p>{project.evidence}</p>
                          </>
                        )}
                        {project.backendPoints.length > 0 && (
                          <ul>
                            {project.backendPoints.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : null}
                    {tab === 2 ? (
                      activeImage ? (
                        <>
                          <button
                            className="project-image"
                            onClick={() => dialogRef.current?.showModal()}
                            aria-label={`${activeImage.alt} 크게 보기`}
                          >
                            <img src={activeImage.src} alt={activeImage.alt} />
                            <span>
                              <Maximize2 size={13} /> 크게 보기
                            </span>
                          </button>
                          <p className="image-caption">
                            {activeImage.alt} · {picture + 1} /{" "}
                            {pictures.length}
                          </p>
                          <div
                            className="image-picker"
                            aria-label="프로젝트 자료"
                          >
                            {pictures.map((p, i) => (
                              <button
                                key={p.src}
                                aria-pressed={i === picture}
                                onClick={() => setPicture(i)}
                              >
                                {p.alt}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="work-note">
                          <Terminal size={32} />
                          <h2>지금도 고치는 중입니다.</h2>
                          <p>
                            AX-Studio의 실제 화면과 상세 작업 기록은 아직
                            등록하지 않았어요.
                          </p>
                          <p>현재 진행 중인 작업으로 소개합니다.</p>
                        </div>
                      )
                    ) : null}
                  </div>
                  {project.links.length > 0 && (
                    <footer className="project-links">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.icon === "github" ? (
                            <Github size={15} />
                          ) : (
                            <ArrowUpRight size={15} />
                          )}
                          {link.label === "Presentation"
                            ? "발표 자료"
                            : link.label}
                        </a>
                      ))}
                    </footer>
                  )}
                </article>
              ) : null}
              {page === "about" ? (
                <article className="profile">
                  <span className="profile-tag">PLAYER PROFILE</span>
                  <h1>신연준입니다.</h1>
                  <p className="profile-intro">
                    백엔드 개발자 되고 싶어요…
                    <br />
                    그래서 이것저것 만들어보고 있습니다.
                  </p>
                  <p>
                    일단 굴려보고, 어디서 깨지는지 끝까지 지켜봅니다. 데이터가
                    흐르고 AI가 움직이는 과정, 그리고 사람이 그 흐름을 이해할 수
                    있는 화면에 관심이 있습니다.
                  </p>
                  <dl>
                    <dt>주로 쓰는 것</dt>
                    <dd>Python · FastAPI · PostgreSQL</dd>
                    <dt>관심 있는 것</dt>
                    <dd>데이터 파이프라인 · 실시간 통신 · AI</dd>
                    <dt>지금 만드는 것</dt>
                    <dd>AX-Studio — 계속 개선 중</dd>
                    <dt>학교</dt>
                    <dd>서원대학교 · 2027.02 졸업 예정</dd>
                  </dl>
                  <p className="profile-footnote">
                    이 칩들은 운영 실적이 아닌, 공부하고 만들었던 작업
                    기록입니다.
                  </p>
                  <button
                    className="pixel-button"
                    onClick={() => navigate("contact")}
                  >
                    이야기 나누기 <ArrowUpRight size={14} />
                  </button>
                </article>
              ) : null}
              {page === "contact" ? (
                <article className="profile contact">
                  <Mail size={32} />
                  <h1>이야기 나눠요.</h1>
                  <p>
                    프로젝트 이야기, 함께 만들고 싶은 것.
                    <br />
                    편하게 연락 주세요.
                  </p>
                  <a
                    className="email-address"
                    href="mailto:sinyeonjun@gmail.com"
                  >
                    sinyeonjun@gmail.com
                  </a>
                  <div className="contact-actions">
                    <button
                      className="pixel-button"
                      onClick={() => void copy()}
                    >
                      이메일 복사
                    </button>
                    <a
                      className="pixel-button"
                      href="https://github.com/shinyeonjun"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  </div>
                  <p role="status">{copied}</p>
                </article>
              ) : null}
            </div>
            <nav className="screen-nav" aria-label="포트폴리오 메뉴">
              {(["projects", "about", "contact"] as const).map((p, i) => (
                <button
                  key={p}
                  aria-current={
                    page === p || (page === "detail" && p === "projects")
                      ? "page"
                      : undefined
                  }
                  onClick={() => navigate(p)}
                >
                  {["PROJECTS", "ABOUT", "CONTACT"][i]}
                </button>
              ))}
            </nav>
          </div>
        </section>
        <aside className="right-controls" aria-label="선택 및 돌아가기">
          <div className="action-buttons">
            <button onClick={confirm} aria-label="A 선택 또는 이미지 확대">
              A
            </button>
            <button onClick={back} aria-label="B 프로젝트 목록으로 돌아가기">
              B
            </button>
          </div>
          <div className="utility-buttons">
            <button
              onClick={() =>
                navigate(
                  page === "about"
                    ? "contact"
                    : page === "contact"
                      ? "projects"
                      : "about",
                )
              }
            >
              <span />
              SELECT
            </button>
            <button
              onClick={() =>
                page === "projects" ? confirm() : navigate("projects")
              }
            >
              <span />
              START
            </button>
          </div>
          <div className="speaker" aria-hidden="true" />
        </aside>
        <footer className="device-bottom">
          <span>백엔드 개발자 되고 싶어요…</span>
          <span>INSERT CURIOSITY.</span>
        </footer>
      </main>
      <footer className="desk-footer">
        <p>
          <kbd>WASD</kbd> / <kbd>방향키</kbd>{" "}
          {page === "detail" ? "탭 이동 · 스크롤" : "이동"} <kbd>ENTER</kbd>{" "}
          선택 <kbd>ESC / ⌫</kbd> 뒤로
        </p>
        <span>클릭과 터치로도 볼 수 있어요.</span>
      </footer>
      <dialog
        aria-label="프로젝트 이미지 확대"
        ref={dialogRef}
        className="picture-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <button autoFocus onClick={() => dialogRef.current?.close()}>
          닫기 · ESC / Backspace
        </button>
        {activeImage && (
          <>
            <img src={activeImage.src} alt={activeImage.alt} />
            <p>
              {project.title} / {activeImage.alt}
            </p>
          </>
        )}
      </dialog>
    </div>
  );
}

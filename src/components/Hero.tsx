import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useEffect, useState, type CSSProperties } from 'react';
import {
    Award,
    BadgeCheck,
    Check,
    Copy,
    Github,
    Mail,
    ArrowDown,
    ShieldCheck,
} from 'lucide-react';

const CONTACT_EMAIL = 'sinyeonjun@gmail.com';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const avatarVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
};

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const certifications = [
    {
        title: 'ITQ 아래한글',
        status: 'B등급',
        kind: '문서 작성',
    },
    {
        title: 'ITQ PowerPoint',
        status: 'B등급',
        kind: '발표 자료',
    },
    {
        title: 'ITQ Excel',
        status: 'A등급',
        kind: '데이터 처리',
    },
    {
        title: '운전면허',
        status: '1종 보통',
        kind: '자격 보유',
    },
    {
        title: '정보처리기사',
        status: '필기 합격',
        kind: '실기 예정',
    },
] as const;

const awards = [
    {
        title: 'SK hynix SPARK',
        detail: '창업 아이디어 챌린지',
        host: 'SK hynix',
        result: '4등',
        date: '2025.04',
    },
] as const;

const skillGroups = [
    {
        label: 'Language',
        accent: '#dbeafe',
        items: [
            { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
            { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: '#F7DF1E' },
            { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
            { name: 'SQL', icon: '', color: '#0f766e' },
        ],
    },
    {
        label: 'Frontend',
        accent: '#ede9fe',
        items: [
            { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26', color: '#E34F26' },
            { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css/1572B6', color: '#1572B6' },
            { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
            { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF', color: '#646CFF' },
        ],
    },
    {
        label: 'Backend',
        accent: '#dcfce7',
        items: [
            { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688', color: '#009688' },
            { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', color: '#5FA04E' },
            { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
            { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57', color: '#003B57' },
            { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E', color: '#3FCF8E' },
        ],
    },
    {
        label: 'Data · DevOps',
        accent: '#fef3c7',
        items: [
            { name: 'GCP', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4', color: '#4285F4' },
            { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
            { name: 'RAG', icon: '', color: '#7c3aed' },
            { name: 'LLM', icon: '', color: '#e11d48' },
            { name: 'Data Pipeline', icon: '', color: '#0ea5e9' },
        ],
    },
] as const;

const growthHeroPillars = [
    '문제 정의부터 구조화',
    '데이터 흐름 우선 설계',
    '자동화와 실제 동작 연결',
] as const;

const growthHeroFacts = [
    { label: 'Now', value: 'Meeting Overlay Assistant' },
    { label: 'Focus', value: 'Data · API · LLM' },
    { label: 'Track', value: 'Personal + Team Projects' },
] as const;

type HeroProps = {
    variant?: 'classic' | 'growth';
};

function fallbackCopy(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

export default function Hero({ variant = 'classic' }: HeroProps) {
    const isGrowthVariant = variant === 'growth';
    const [revealed, setRevealed] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!contactOpen) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setContactOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [contactOpen]);

    useEffect(() => {
        if (!copied) {
            return undefined;
        }

        const timer = setTimeout(() => setCopied(false), 1600);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
        } catch {
            fallbackCopy(CONTACT_EMAIL);
        }

        setCopied(true);
    };

    return (
        <section className="hero-wrap" id="home">
            <AnimatePresence>
                {!revealed && (
                    <>
                        <motion.div
                            className="curtain curtain-left"
                            initial={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <motion.div
                            className="curtain curtain-right"
                            initial={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <motion.div
                            className="curtain-text"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="curtain-greeting">Welcome</span>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <motion.div
                className={`profile-container${isGrowthVariant ? ' is-growth-variant' : ''}`}
                initial="hidden"
                animate={revealed ? 'show' : 'hidden'}
                variants={containerVariants}
            >
                <div className={`profile-hero-stage${isGrowthVariant ? ' is-growth' : ''}`}>
                    <div className="profile-hero-core">
                        <motion.div
                            className="profile-avatar-wrap"
                            variants={avatarVariants}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <div className="profile-status">
                                <div className="profile-status-dot" />
                                <span>구직 중</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="profile-info"
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="profile-name">신연준</h1>
                            <p className="profile-role">Backend & Data Pipeline Developer</p>
                        </motion.div>
                    </div>

                    {isGrowthVariant && (
                        <motion.div
                            className="growth-hero-summary"
                            variants={fadeUpVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="growth-hero-panel-label">Growth Angle</span>
                            <strong className="growth-hero-summary-title">
                                구조를 먼저 잡고, 데이터와 동작이 실제로 이어지게 만드는 쪽에
                                강점이 있습니다.
                            </strong>
                            <p className="growth-hero-summary-copy">
                                일정 관리와 프로토타입 작업에서 출발해 데이터 파이프라인, 운영
                                흐름, AI 보조 시스템까지 범위를 넓혀왔습니다.
                            </p>

                            <div className="growth-hero-pillars">
                                {growthHeroPillars.map((item) => (
                                    <span className="growth-hero-pill" key={item}>
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="growth-hero-facts growth-hero-facts-inline">
                                {growthHeroFacts.map((item) => (
                                    <div className="growth-hero-fact" key={item.label}>
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    className="profile-skill-groups"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.5 }}
                >
                    {skillGroups.map((group) => (
                        <article
                            className="skill-group"
                            key={group.label}
                            style={{ '--skill-accent': group.accent } as CSSProperties}
                        >
                            <div className="skill-group-head">
                                <span className="skill-group-label">{group.label}</span>
                                <span className="skill-group-count">{group.items.length} Stack</span>
                            </div>
                            <div className="skill-group-items">
                                {group.items.map((skill) => (
                                    <span className="profile-tag" key={skill.name}>
                                        {skill.icon ? (
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="profile-tag-icon"
                                            />
                                        ) : (
                                            <span
                                                className="profile-tag-dot"
                                                style={{ backgroundColor: skill.color }}
                                            />
                                        )}
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </motion.div>

                <motion.div
                    className="profile-actions"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.5 }}
                >
                    <a className="button primary hover-trigger" href="#projects">
                        프로젝트 보기 <ArrowDown size={16} style={{ marginLeft: 6 }} />
                    </a>
                    <a
                        className="button secondary hover-trigger"
                        href="https://github.com/shinyeonjun"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github size={16} style={{ marginRight: 6 }} /> GitHub
                    </a>
                    <button
                        type="button"
                        className={`button secondary contact-trigger hover-trigger${contactOpen ? ' is-open' : ''}`}
                        onClick={() => setContactOpen((open) => !open)}
                        aria-expanded={contactOpen}
                        aria-controls="contact-signal"
                    >
                        <Mail size={16} style={{ marginRight: 6 }} /> 연락하기
                    </button>
                </motion.div>

                <AnimatePresence>
                    {contactOpen && (
                        <motion.div
                            id="contact-signal"
                            className="contact-inline-wrap"
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.24, ease: 'easeOut' }}
                        >
                            <motion.div
                                className="contact-inline-card"
                                initial={{ scale: 0.98 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.985 }}
                                transition={{ duration: 0.22, ease: 'easeOut' }}
                            >
                                <motion.span
                                    className="contact-inline-accent"
                                    initial={{ scaleX: 0, opacity: 0.6 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    exit={{ scaleX: 0.85, opacity: 0 }}
                                    transition={{ duration: 0.32, ease: 'easeOut' }}
                                />

                                <div className="contact-inline-head">
                                    <span className="contact-inline-label">Email Contact</span>
                                    <span
                                        className={`contact-inline-status${copied ? ' is-copied' : ''}`}
                                    >
                                        {copied ? '복사됨' : '클릭해서 복사'}
                                    </span>
                                </div>

                                <div className="contact-inline-row">
                                    <div className="contact-inline-address-wrap">
                                        <span className="contact-inline-prefix">메일 주소</span>
                                        <strong className="contact-inline-address">{CONTACT_EMAIL}</strong>
                                    </div>
                                    <button
                                        type="button"
                                        className="contact-inline-copy hover-trigger"
                                        onClick={handleCopyEmail}
                                    >
                                        {copied ? <Check size={15} /> : <Copy size={15} />}
                                        {copied ? '복사 완료' : '주소 복사'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="profile-stats"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.5 }}
                >
                    <div className="stat-card">
                        <span>진행 프로젝트</span>
                        <strong>5 Projects</strong>
                    </div>
                    <div className="stat-card">
                        <span>주요 스택</span>
                        <strong>Data · API · LLM</strong>
                    </div>
                    <div className="stat-card">
                        <span>중요하게 생각하는 것</span>
                        <strong>구조 · 흐름 · 실제 동작</strong>
                    </div>
                </motion.div>

                <motion.div
                    className="profile-credentials"
                    id="credentials"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.5 }}
                >
                    <section className="credential-panel certificate-panel">
                        <div className="credential-head">
                            <div className="credential-title">
                                <BadgeCheck size={18} />
                                <span>자격증</span>
                            </div>
                            <span className="credential-count">{certifications.length} Items</span>
                        </div>
                        <div className="certificate-list">
                            {certifications.map((item) => (
                                <article className="certificate-card" key={`${item.title}-${item.status}`}>
                                    <div className="certificate-card-top">
                                        <span className="certificate-chip">{item.kind}</span>
                                        <ShieldCheck size={16} />
                                    </div>
                                    <strong>{item.title}</strong>
                                    <p>{item.status}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="credential-panel award-panel">
                        <div className="credential-head">
                            <div className="credential-title">
                                <Award size={18} />
                                <span>수상 경력</span>
                            </div>
                            <span className="credential-count">{awards.length} Highlight</span>
                        </div>
                        <div className="award-list">
                            {awards.map((item) => (
                                <article className="award-card" key={`${item.title}-${item.date}`}>
                                    <div className="award-ribbon">
                                        <span className="award-ribbon-label">Result</span>
                                        <strong>{item.result}</strong>
                                    </div>
                                    <div className="award-copy">
                                        <div className="award-meta">
                                            <span className="award-host">{item.host}</span>
                                            <span className="award-date">{item.date}</span>
                                        </div>
                                        <strong>{item.title}</strong>
                                        <p>{item.detail}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </motion.div>
        </section>
    );
}

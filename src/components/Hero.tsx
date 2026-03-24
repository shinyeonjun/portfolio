import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Mail, ArrowDown } from 'lucide-react';

/**
 * 프로필 중심 Hero 섹션
 * - 커튼(오버레이)이 갈라지며 프로필이 드러나는 오프닝 애니메이션
 * - 프로필 아바타 + 이름/역할 + 스택 태그 + 버튼 링크
 */
export default function Hero() {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        // 페이지 로드 후 0.6초 뒤에 커튼 오픈
        const timer = setTimeout(() => setRevealed(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-wrap" id="home">
            {/* 검은 커튼 오버레이: 좌/우로 갈라지며 사라지는 연출 */}
            <AnimatePresence>
                {!revealed && (
                    <>
                        {/* 왼쪽 커튼 */}
                        <motion.div
                            className="curtain curtain-left"
                            initial={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                        {/* 오른쪽 커튼 */}
                        <motion.div
                            className="curtain curtain-right"
                            initial={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                        {/* 커튼 중앙 텍스트 */}
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

            {/* 메인 프로필 콘텐츠 */}
            <motion.div
                className="profile-container"
                initial="hidden"
                animate={revealed ? 'show' : 'hidden'}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
                    },
                } as any}
            >
                {/* 프로필 아바타 */}
                <motion.div
                    className="profile-avatar-wrap"
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        show: { opacity: 1, scale: 1 },
                    } as any}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="profile-avatar">
                        <span className="profile-avatar-initials">SYJ</span>
                    </div>
                    {/* 상태 배지 */}
                    <div className="profile-status">
                        <div className="profile-status-dot" />
                        <span>구직 중</span>
                    </div>
                </motion.div>

                {/* 이름 & 역할 */}
                <motion.div
                    className="profile-info"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                    } as any}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="profile-name">신연준</h1>
                    <p className="profile-role">Backend & Data Pipeline Developer</p>
                </motion.div>


                {/* 스택 아이콘 태그 */}
                <motion.div
                    className="profile-tags"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                    } as any}
                    transition={{ duration: 0.5 }}
                >
                    {[
                        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
                        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688', color: '#009688' },
                        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
                        { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57', color: '#003B57' },
                        { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E', color: '#3FCF8E' },
                        { name: 'GCP', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4', color: '#4285F4' },
                        { name: 'RAG', icon: '', color: '#7c3aed' },
                        { name: 'LLM', icon: '', color: '#e11d48' },
                        { name: 'Data Pipeline', icon: '', color: '#0ea5e9' },
                    ].map((skill) => (
                        <span className="profile-tag" key={skill.name}>
                            {skill.icon && (
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="profile-tag-icon"
                                />
                            )}
                            {!skill.icon && (
                                <span
                                    className="profile-tag-dot"
                                    style={{ backgroundColor: skill.color }}
                                />
                            )}
                            {skill.name}
                        </span>
                    ))}
                </motion.div>

                {/* 버튼 & 액션 */}
                <motion.div
                    className="profile-actions"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                    } as any}
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
                    <a
                        className="button secondary hover-trigger"
                        href="mailto:sinyeonjun@gmail.com"
                    >
                        <Mail size={16} style={{ marginRight: 6 }} /> 연락하기
                    </a>
                </motion.div>

                {/* 하단 통계 카드 */}
                <motion.div
                    className="profile-stats"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                    } as any}
                    transition={{ duration: 0.5 }}
                >
                    <div className="stat-card">
                        <span>핵심 프로젝트</span>
                        <strong>4 Projects</strong>
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
            </motion.div>
        </section>
    );
}

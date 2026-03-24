import { useEffect, useState } from 'react';

const primaryItems = [
    { id: 'home', label: 'Home' },
    { id: 'credentials', label: 'Profile' },
] as const;

const projectItems = [
    { id: 'de-pipeline', label: 'DE-pipeline' },
    { id: 'caps', label: 'Meeting AI' },
    { id: 'ai-schedule', label: 'AI Schedule' },
    { id: 'control-dock', label: 'ControlDock' },
    { id: 'wedding-album', label: 'Wedding Album' },
] as const;

const observedIds = [
    ...primaryItems.map((item) => item.id),
    'projects',
    ...projectItems.map((item) => item.id),
] as const;

export default function QuickNav() {
    const [activeId, setActiveId] = useState<(typeof observedIds)[number]>('home');

    useEffect(() => {
        const sections = observedIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) {
            return undefined;
        }

        const updateActiveSection = () => {
            const activationLine = window.innerHeight * 0.24;
            const candidates = sections
                .map((section) => ({
                    id: section.id,
                    top: section.getBoundingClientRect().top,
                }))
                .filter((section) => section.top <= activationLine)
                .sort((a, b) => b.top - a.top);

            if (candidates[0]) {
                setActiveId(candidates[0].id as (typeof observedIds)[number]);
                return;
            }

            setActiveId(sections[0].id as (typeof observedIds)[number]);
        };

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, []);

    const isProjectGroupActive =
        activeId === 'projects' || projectItems.some((item) => item.id === activeId);

    return (
        <nav className="quick-nav" aria-label="페이지 바로가기">
            <span className="quick-nav-title">Contents</span>
            <div className="quick-nav-links">
                {primaryItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`quick-nav-link hover-trigger${activeId === item.id ? ' is-active' : ''}`}
                        aria-current={activeId === item.id ? 'page' : undefined}
                        onClick={() => setActiveId(item.id)}
                    >
                        <span>{item.label}</span>
                    </a>
                ))}
            </div>

            <div className="quick-nav-group">
                <a
                    href="#projects"
                    className={`quick-nav-link quick-nav-group-link hover-trigger${isProjectGroupActive ? ' is-active' : ''}`}
                    aria-current={activeId === 'projects' ? 'page' : undefined}
                    onClick={() => setActiveId('projects')}
                >
                    <span>Projects</span>
                </a>
                <div className="quick-nav-subitems">
                    {projectItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`quick-nav-sublink hover-trigger${activeId === item.id ? ' is-active' : ''}`}
                            aria-current={activeId === item.id ? 'page' : undefined}
                            onClick={() => setActiveId(item.id)}
                        >
                            <span className="quick-nav-dot" />
                            <span>{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

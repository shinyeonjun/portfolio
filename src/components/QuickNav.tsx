import { BadgeCheck, FolderKanban, House, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'credentials', label: 'Profile', icon: BadgeCheck },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contact', label: 'Contact', icon: Mail },
] as const;

export default function QuickNav() {
    const [activeId, setActiveId] = useState<(typeof navItems)[number]['id']>('home');

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries[0]) {
                    setActiveId(visibleEntries[0].target.id as (typeof navItems)[number]['id']);
                }
            },
            {
                rootMargin: '-32% 0px -42% 0px',
                threshold: [0.15, 0.3, 0.5, 0.7],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="quick-nav" aria-label="페이지 바로가기">
            <span className="quick-nav-title">Quick Jump</span>
            <div className="quick-nav-links">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`quick-nav-link hover-trigger${activeId === item.id ? ' is-active' : ''}`}
                            aria-current={activeId === item.id ? 'page' : undefined}
                            onClick={() => setActiveId(item.id)}
                        >
                            <Icon size={16} />
                            <span>{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}

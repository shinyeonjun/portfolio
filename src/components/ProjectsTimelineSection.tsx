import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ProjectsTimelineSkeleton from './ProjectsTimelineSkeleton';

const ProjectsTimeline = lazy(() => import('./ProjectsTimeline'));

export default function ProjectsTimelineSection() {
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const [shouldLoad, setShouldLoad] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        return window.location.hash.length > 0;
    });

    useEffect(() => {
        if (shouldLoad) {
            return undefined;
        }

        const anchor = anchorRef.current;

        if (!anchor) {
            return undefined;
        }

        // 프로젝트 섹션이 가까워질 때만 실제 모듈과 이미지 로딩을 시작한다.
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '480px 0px' },
        );

        observer.observe(anchor);

        return () => observer.disconnect();
    }, [shouldLoad]);

    useEffect(() => {
        if (shouldLoad) {
            return undefined;
        }

        const handleHashChange = () => {
            if (window.location.hash.length > 0) {
                setShouldLoad(true);
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [shouldLoad]);

    if (!shouldLoad) {
        return (
            <div ref={anchorRef}>
                <ProjectsTimelineSkeleton />
            </div>
        );
    }

    return (
        <Suspense fallback={<ProjectsTimelineSkeleton />}>
            <ProjectsTimeline />
        </Suspense>
    );
}

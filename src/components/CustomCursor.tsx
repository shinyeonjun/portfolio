import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * 커스텀 커서 컴포넌트
 * - 중심 점(dot): 12px, 진한 색, 즉각 반응
 * - 바깥 링(ring): 40px, 부드럽게 추적
 * - 호버 시 링이 64px로 커지고 색상 강조
 */
export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // 링크, 버튼, hover-trigger 클래스가 있는 요소에서 호버 상태 활성화
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hover-trigger') ||
                target.closest('.hover-trigger') ||
                target.closest('.stat-card') ||
                target.closest('.stack-chip') ||
                target.closest('.highlight-chip') ||
                target.closest('.visual-card') ||
                target.closest('.panel') ||
                target.closest('.project-link')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const dotStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: isHovering ? '#2563eb' : '#0f172a',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference' as const,
    };

    const ringSize = isHovering ? 64 : 40;
    const ringStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: ringSize,
        height: ringSize,
        borderRadius: '50%',
        border: isHovering
            ? '2px solid rgba(37, 99, 235, 0.6)'
            : '1.5px solid rgba(15, 23, 42, 0.25)',
        backgroundColor: isHovering
            ? 'rgba(37, 99, 235, 0.08)'
            : 'transparent',
        pointerEvents: 'none',
        zIndex: 9998,
    };

    return (
        <>
            {/* 중심 점 - 즉각 반응 */}
            <motion.div
                style={dotStyle}
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.08 }}
            />
            {/* 바깥 링 - 부드럽게 추적 */}
            <motion.div
                style={ringStyle}
                animate={{
                    x: mousePosition.x - ringSize / 2,
                    y: mousePosition.y - ringSize / 2,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18,
                    mass: 0.4,
                }}
            />
        </>
    );
}

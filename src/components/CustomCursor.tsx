import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type PointerState = {
    x: number;
    y: number;
    active: boolean;
};

function isInteractiveTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    const interactive = target.closest(
        [
            'a',
            'button',
            '[role="button"]',
            '.hover-trigger',
            '.growth-progress-item',
            '.growth-control',
            '.growth-primary-visual',
            '.growth-support-card',
            '.growth-artifact-card',
            '.project-link',
            '.contact-inline-copy',
        ].join(','),
    );

    if (!interactive) {
        return false;
    }

    if (interactive instanceof HTMLButtonElement && interactive.disabled) {
        return false;
    }

    return true;
}

export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [pointer, setPointer] = useState<PointerState>({
        x: 0,
        y: 0,
        active: false,
    });

    useEffect(() => {
        const finePointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
        const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

        const updateAvailability = () => {
            setEnabled(finePointerMedia.matches && !reducedMotionMedia.matches);
        };

        updateAvailability();

        finePointerMedia.addEventListener('change', updateAvailability);
        reducedMotionMedia.addEventListener('change', updateAvailability);

        return () => {
            finePointerMedia.removeEventListener('change', updateAvailability);
            reducedMotionMedia.removeEventListener('change', updateAvailability);
        };
    }, []);

    useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        const handlePointerMove = (event: PointerEvent) => {
            setPointer({
                x: event.clientX,
                y: event.clientY,
                active: isInteractiveTarget(event.target),
            });
        };

        const handlePointerLeave = () => {
            setPointer((current) => ({ ...current, active: false }));
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <motion.div
            className={`cursor-accent${pointer.active ? ' is-active' : ''}`}
            animate={{
                x: pointer.x + 12,
                y: pointer.y - 14,
                opacity: pointer.active ? 1 : 0,
                scale: pointer.active ? 1 : 0.92,
            }}
            transition={{
                x: { type: 'spring', stiffness: 520, damping: 34, mass: 0.24 },
                y: { type: 'spring', stiffness: 520, damping: 34, mass: 0.24 },
                opacity: { duration: 0.16, ease: 'easeOut' },
                scale: { duration: 0.18, ease: 'easeOut' },
            }}
            aria-hidden="true"
        >
            <span className="cursor-accent-bracket">[</span>
            <span className="cursor-accent-core" />
            <span className="cursor-accent-bracket">]</span>
        </motion.div>
    );
}

'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressProps {
    className?: string;
    container: React.RefObject<HTMLDivElement>;
}

export default function ScrollProgress({ className, container }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll({
        container: container,
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 500,
        damping: 50,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className={cn('absolute inset-x-0 top-0 z-[1000] h-1 origin-left gradient', className)}
            style={{ scaleX }}
        />
    );
}

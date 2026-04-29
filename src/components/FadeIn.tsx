import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    fullWidth?: boolean;
    scale?: number;
    duration?: number;
    ease?: Easing | Easing[];
    threshold?: number;
}

const FadeIn = ({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    fullWidth = false,
    scale = 1,
    duration = 0.8,
    ease = [0.22, 1, 0.36, 1] as Easing, // Custom "premium" cubic-bezier
    threshold = 0.1
}: FadeInProps) => {
    const directions = {
        up: { y: 0, x: 0 },
        down: { y: 0, x: 0 },
        left: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
            }}
            viewport={{
                once: true,
                amount: threshold,
                margin: "0px 0px -50px 0px"
            }}
            transition={{
                duration,
                delay,
                ease
            }}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;

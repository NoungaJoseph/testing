import { useEffect, useRef } from 'react';

interface AnimatedNetworkBgProps {
    className?: string;
    dotColor?: string;
    lineColor?: string;
    particleCount?: number;
}

const AnimatedNetworkBg = ({
    className = '',
    dotColor = 'rgba(212, 175, 55, 0.5)',
    lineColor = 'rgba(10, 15, 44, 0.06)',
    particleCount = 55,
}: AnimatedNetworkBgProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0, H = 0;

        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        type Particle = { x: number; y: number; r: number };
        const particles: Particle[] = Array.from({ length: particleCount }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 2 + Math.random() * 2,
        }));

        const CONNECT_DIST = 140;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        ctx.globalAlpha = 1 - dist / CONNECT_DIST;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            // Draw dots
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = dotColor;
                ctx.fill();
            }

        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [dotColor, lineColor, particleCount]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    );
};

export default AnimatedNetworkBg;

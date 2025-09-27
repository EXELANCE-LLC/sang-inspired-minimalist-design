import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircleMore, Sparkles } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/webusta";
const MAIL_TO = "mailto:info@webusta.org?subject=Feedback";

type SparkleShape = "star" | "dot";

type SparkleParticle = {
    id: string;
    tx: number;
    ty: number;
    size: number;
    rotate: number;
    delay: number;
    duration: number;
    shape: SparkleShape;
};

function useSparkleBurst() {
    const [burstKey, setBurstKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setBurstKey(k => k + 1), 2200);
        return () => clearInterval(interval);
    }, []);

    const particles: SparkleParticle[] = useMemo(() => {
        const count = 16;
        const baseAngle = Math.random() * Math.PI * 2;

        const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

        return Array.from({ length: count }).map((_, i) => {
            const angle = baseAngle + (i / count) * Math.PI * 2 + randomBetween(-0.2, 0.2);
            const distance = randomBetween(14, 28);
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const size = randomBetween(6, 12);
            const rotate = randomBetween(-120, 120);
            const delay = i * 30 + randomBetween(0, 80);
            const duration = randomBetween(900, 1400);
            const shape: SparkleShape = Math.random() < 0.65 ? "star" : "dot";
            return { id: `${burstKey}-${i}`, tx, ty, size, rotate, delay, duration, shape };
        });
    }, [burstKey]);

    return particles;
}

export default function FeedbackFab() {
	const [open, setOpen] = useState(false);
	const particles = useSparkleBurst();

	return (
		<>
			{/* Floating FAB */}
			<div className="fixed left-4 bottom-4 z-50">
				<button
					aria-label="Open feedback"
					onClick={() => setOpen(true)}
					className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
				>
                    <Sparkles className="h-5 w-5" />
                    {/* Sparkle particles */}
                    <span aria-hidden className="pointer-events-none absolute inset-0">
                        {/* Expanding ring */}
                        <span
                            className="absolute left-1/2 top-1/2 -ml-3 -mt-3 h-6 w-6 rounded-full border border-white/70 dark:border-white/80 opacity-0"
                            style={{
                                "--sparkle-ring-dur": `900ms`,
                                animation: `sparkle-ring var(--sparkle-ring-dur) ease-out 0ms both`,
                                filter: "drop-shadow(0 0 6px rgba(255,255,255,.65))",
                                mixBlendMode: "screen",
                            } as CSSProperties & Record<'--sparkle-ring-dur', string>}
                        />
                        {particles.map(p => (
                            p.shape === "star" ? (
                                <svg
                                    key={p.id}
                                    className="absolute text-white dark:text-white"
                                    viewBox="0 0 24 24"
                                    width={p.size}
                                    height={p.size}
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                        "--tx": `${p.tx}px`,
                                        "--ty": `${p.ty}px`,
                                        "--rot": `${p.rotate}deg`,
                                        "--dur": `${p.duration}ms`,
                                        animation: `sparkle-burst var(--dur) cubic-bezier(.21,1,.25,1) ${p.delay}ms both, sparkle-twinkle 900ms ease-in-out ${p.delay}ms both`,
                                        filter: "drop-shadow(0 0 10px rgba(255,255,255,.9)) drop-shadow(0 0 18px rgba(255,230,160,.6))",
                                        mixBlendMode: "screen",
                                    } as CSSProperties & Record<'--tx' | '--ty' | '--rot' | '--dur', string>}
                                >
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                        fill="currentColor"
                                    />
                                </svg>
                            ) : (
                                <span
                                    key={p.id}
                                    className="absolute rounded-full"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        width: `${Math.max(3, Math.round(p.size * 0.35))}px`,
                                        height: `${Math.max(3, Math.round(p.size * 0.35))}px`,
                                        transform: "translate(-50%, -50%)",
                                        background: "radial-gradient(circle, rgba(255,255,255,.98) 0%, rgba(255,255,255,.7) 55%, rgba(255,255,255,0) 70%)",
                                        "--tx": `${p.tx}px`,
                                        "--ty": `${p.ty}px`,
                                        "--rot": `${p.rotate}deg`,
                                        "--dur": `${p.duration}ms`,
                                        animation: `sparkle-burst var(--dur) cubic-bezier(.21,1,.25,1) ${p.delay}ms both, sparkle-twinkle 900ms ease-in-out ${p.delay}ms both`,
                                        filter: "drop-shadow(0 0 8px rgba(255,255,255,.9)) drop-shadow(0 0 16px rgba(255,230,160,.55))",
                                        mixBlendMode: "screen",
                                    } as CSSProperties & Record<'--tx' | '--ty' | '--rot' | '--dur', string>}
                                />
                            )
                        ))}
                    </span>
				</button>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>feedback</DialogTitle>
						<DialogDescription>Geri bildirim göndermek için bir yol seçin.</DialogDescription>
					</DialogHeader>
					<div className="mt-2 grid gap-3">
						<a href={MAIL_TO} className="w-full" onClick={() => setOpen(false)}>
							<Button variant="secondary" className="w-full justify-start gap-2">
								<Mail className="h-4 w-4" />
								<span>info@webusta.org</span>
							</Button>
						</a>
						<a href={WHATSAPP_URL} className="w-full" target="_blank" rel="noreferrer noopener" onClick={() => setOpen(false)}>
							<Button className="w-full justify-start gap-2">
								<MessageCircleMore className="h-4 w-4" />
								<span>WhatsApp ile yaz</span>
							</Button>
						</a>
					</div>
				</DialogContent>
			</Dialog>

            <style>
                {`
                @keyframes sparkle-burst {
                    0% {
                        transform: translate(-50%, -50%) translate(0px, 0px) scale(0.3) rotate(0deg);
                        opacity: 0;
                    }
                    12% { opacity: 1; }
                    80% { opacity: .95; }
                    100% {
                        transform: translate(-50%, -50%) translate(var(--tx, 0px), var(--ty, 0px)) scale(1) rotate(var(--rot, 0deg));
                        opacity: 0;
                    }
                }

                @keyframes sparkle-twinkle {
                    0% { filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
                    50% { filter: drop-shadow(0 0 10px rgba(255,255,255,.9)) drop-shadow(0 0 18px rgba(255,230,160,.6)); }
                    100% { filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
                }

                @keyframes sparkle-ring {
                    0% { transform: scale(0.5); opacity: 0; }
                    20% { opacity: .85; }
                    100% { transform: scale(1.6); opacity: 0; }
                }

                @media (prefers-reduced-motion: reduce) {
                    @keyframes sparkle-burst {
                        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                    }
                    @keyframes sparkle-ring {
                        0% { transform: scale(0.8); opacity: 0; }
                        100% { transform: scale(1.1); opacity: 0; }
                    }
                }
                `}
            </style>
		</>
	);
}


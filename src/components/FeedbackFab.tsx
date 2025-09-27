import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircleMore, Sparkles } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/webusta";
const MAIL_TO = "mailto:info@webusta.org?subject=Feedback";

function useSparkleBurst() {
	const [burstKey, setBurstKey] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => setBurstKey(k => k + 1), 2400);
		return () => clearInterval(interval);
	}, []);
	const particles = useMemo(() => {
		const count = 8;
		return Array.from({ length: count }).map((_, i) => {
			const angle = (i / count) * Math.PI * 2;
			const distance = 12 + (i % 3) * 4;
			const x = Math.cos(angle) * distance;
			const y = Math.sin(angle) * distance;
			return { id: `${burstKey}-${i}`, x, y, delay: i * 40 };
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
						{particles.map(p => (
							<span
								key={p.id}
								className="absolute h-1.5 w-1.5 rounded-full bg-white/90 dark:bg-white"
								style={{
									// Use CSS vars consumed by keyframes for end position
									// @ts-expect-error CSS custom properties
									"--x": `${p.x}px`,
									// @ts-expect-error CSS custom properties
									"--y": `${p.y}px`,
									opacity: 0,
									animation: `sparkle-pop 1.2s ease-out ${p.delay}ms both`,
								}}
							/>
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
				@keyframes sparkle-pop {
					0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
					15% { opacity: 1; }
					70% { opacity: .9; }
					100% { transform: translate(var(--x, 0), var(--y, 0)) scale(1); opacity: 0; }
				}
				`}
			</style>
		</>
	);
}


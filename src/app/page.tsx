"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

// Register the plugin
gsap.registerPlugin(useGSAP);

export default function Home() {
	const container = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLHeadingElement>(null);

	useGSAP(
		() => {
			// Basic fade in animation for the title
			gsap.fromTo(
				textRef.current,
				{
					opacity: 0,
					y: -50,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power2.out",
				},
			);

			// Box animation - rotate and scale
			gsap.to(boxRef.current, {
				rotation: 360,
				scale: 1.2,
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "power2.inOut",
			});

			// Circle animation - bounce effect
			gsap.to(circleRef.current, {
				y: -30,
				duration: 0.8,
				repeat: -1,
				yoyo: true,
				ease: "bounce.out",
			});

			// Timeline example for complex animations
			const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
			tl.to(".animated-text", {
				scale: 1.1,
				color: "#3b82f6",
				duration: 0.5,
			})
				.to(".animated-text", {
					scale: 1,
					color: "#10b981",
					duration: 0.5,
				})
				.to(".animated-text", {
					scale: 0.9,
					color: "#f59e0b",
					duration: 0.5,
				})
				.to(".animated-text", {
					scale: 1,
					color: "#ef4444",
					duration: 0.5,
				});
		},
		{ scope: container },
	);

	return (
		<div
			ref={container}
			className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-8"
		>
			<div className="mx-auto max-w-4xl space-y-12 text-center">
				{/* Title */}
				<h1
					ref={textRef}
					className="mb-8 font-bold text-5xl text-white md:text-7xl"
				>
					GSAP + React
				</h1>

				{/* Animated Elements */}
				<div className="flex flex-wrap items-center justify-center gap-12">
					{/* Rotating Box */}
					<div className="flex flex-col items-center space-y-4">
						<div
							ref={boxRef}
							className="h-20 w-20 rounded-lg bg-blue-500 shadow-lg"
						/>
						<p className="text-sm text-white">Rotating Box</p>
					</div>

					{/* Bouncing Circle */}
					<div className="flex flex-col items-center space-y-4">
						<div
							ref={circleRef}
							className="h-20 w-20 rounded-full bg-green-500 shadow-lg"
						/>
						<p className="text-sm text-white">Bouncing Circle</p>
					</div>

					{/* Color Changing Text */}
					<div className="flex flex-col items-center space-y-4">
						<div className="animated-text font-bold text-4xl">GSAP</div>
						<p className="text-sm text-white">Color Animation</p>
					</div>
				</div>

				{/* Info Section */}
				<div className="rounded-xl bg-white/10 p-6 text-white backdrop-blur-sm">
					<h2 className="mb-4 font-semibold text-2xl">
						GSAP React Integration
					</h2>
					<div className="grid gap-4 text-left md:grid-cols-2">
						<div>
							<h3 className="mb-2 font-semibold text-blue-300">Features:</h3>
							<ul className="space-y-1 text-sm">
								<li>• useGSAP hook for React integration</li>
								<li>• Scoped animations with useRef</li>
								<li>• Timeline animations</li>
								<li>• Infinite loops and yoyo effects</li>
							</ul>
						</div>
						<div>
							<h3 className="mb-2 font-semibold text-green-300">Tech Stack:</h3>
							<ul className="space-y-1 text-sm">
								<li>• Next.js 15</li>
								<li>• GSAP with React hooks</li>
								<li>• TypeScript</li>
								<li>• Tailwind CSS</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Controls */}
				<div className="flex justify-center gap-4">
					<button
						type="button"
						onClick={() => {
							gsap.to([boxRef.current, circleRef.current], {
								rotation: "+=360",
								duration: 1,
								ease: "power2.out",
							});
						}}
						className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
					>
						Trigger Animation
					</button>
					<button
						type="button"
						onClick={() => {
							gsap.to([boxRef.current, circleRef.current], {
								scale: 0,
								duration: 0.3,
								yoyo: true,
								repeat: 1,
								ease: "power2.inOut",
							});
						}}
						className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
					>
						Pulse Effect
					</button>
					<a
						href="/slide"
						className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
					>
						View Slide Demo
					</a>
				</div>
			</div>
		</div>
	);
}

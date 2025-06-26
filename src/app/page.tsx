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
			className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col items-center justify-center p-8"
		>
			<div className="max-w-4xl mx-auto text-center space-y-12">
				{/* Title */}
				<h1
					ref={textRef}
					className="text-5xl md:text-7xl font-bold text-white mb-8"
				>
					GSAP + React
				</h1>

				{/* Animated Elements */}
				<div className="flex flex-wrap justify-center items-center gap-12">
					{/* Rotating Box */}
					<div className="flex flex-col items-center space-y-4">
						<div
							ref={boxRef}
							className="w-20 h-20 bg-blue-500 rounded-lg shadow-lg"
						/>
						<p className="text-white text-sm">Rotating Box</p>
					</div>

					{/* Bouncing Circle */}
					<div className="flex flex-col items-center space-y-4">
						<div
							ref={circleRef}
							className="w-20 h-20 bg-green-500 rounded-full shadow-lg"
						/>
						<p className="text-white text-sm">Bouncing Circle</p>
					</div>

					{/* Color Changing Text */}
					<div className="flex flex-col items-center space-y-4">
						<div className="animated-text text-4xl font-bold">GSAP</div>
						<p className="text-white text-sm">Color Animation</p>
					</div>
				</div>

				{/* Info Section */}
				<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
					<h2 className="text-2xl font-semibold mb-4">
						GSAP React Integration
					</h2>
					<div className="grid md:grid-cols-2 gap-4 text-left">
						<div>
							<h3 className="font-semibold text-blue-300 mb-2">Features:</h3>
							<ul className="space-y-1 text-sm">
								<li>• useGSAP hook for React integration</li>
								<li>• Scoped animations with useRef</li>
								<li>• Timeline animations</li>
								<li>• Infinite loops and yoyo effects</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-green-300 mb-2">Tech Stack:</h3>
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
				<div className="flex gap-4 justify-center">
					<button
						type="button"
						onClick={() => {
							gsap.to([boxRef.current, circleRef.current], {
								rotation: "+=360",
								duration: 1,
								ease: "power2.out",
							});
						}}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
						className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
					>
						Pulse Effect
					</button>
					<a
						href="/slide"
						className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
					>
						View Slide Demo
					</a>
				</div>
			</div>
		</div>
	);
}

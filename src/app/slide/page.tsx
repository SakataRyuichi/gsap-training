"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function SlidePage() {
	// ScrollTrigger.create({
	// 	trigger: ".box",
	// 	start: "top top",
	// 	end: "bottom top",
	// 	scrub: true,
	// 	markers: true,
	// });
	const container = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const boxRef2 = useRef<HTMLDivElement>(null);
	const boxRef3 = useRef<HTMLDivElement>(null);
	const boxRef4 = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(boxRef.current, {
			x: 500,
			duration: 3,
			ease: "none",
			scrollTrigger: {
				trigger: container.current,
				start: "top top",
				end: "+=500",
				scrub: 1,
				markers: true,
			},
		});
		gsap.to(boxRef2.current, {
			x: 200,
			y: 200,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: container.current,
				start: "center center",
				end: "bottom bottom",
				scrub: true,
				markers: true,
			},
		});
		gsap.fromTo(
			boxRef3.current,
			{
				x: 300,
			},
			{
				x: 600,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: container.current,
					start: "top center",
					end: "bottom bottom",
					scrub: true,
					markers: true,
				},
			},
		);
		gsap.to(boxRef4.current, {
			x: 900,
			duration: 10,
			ease: "power2.out",
			scrollTrigger: {
				trigger: container.current,
				start: "bottom bottom",
				end: "+=500",
				scrub: true,
				markers: true,
			},
		});
	});
	return (
		<div className="relative min-h-screen items-center justify-start pb-[50vh]">
			<div ref={container} className="mt-[60vh] flex flex-col gap-[2000px]">
				<div ref={boxRef} className="h-[100px] w-[100px] bg-red-500"></div>
				<div ref={boxRef2} className="h-[100px] w-[100px] bg-red-500"></div>
				<div ref={boxRef3} className="h-[100px] w-[100px] bg-red-500"></div>
				<div ref={boxRef4} className="h-[100px] w-[100px] bg-red-500"></div>
			</div>
		</div>
	);
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "GSAP Slide Demo - Full Screen Scroll",
	description:
		"Interactive full-screen slide presentation powered by GSAP ScrollTrigger",
};

export default function SlideLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="overflow-x-hidden overscroll-none bg-black text-white">
			{children}
		</div>
	);
}

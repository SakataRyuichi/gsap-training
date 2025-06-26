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
		<html lang="en" className="scroll-smooth">
			<body
				className="overflow-x-hidden"
				style={{
					margin: 0,
					padding: 0,
					overscrollBehavior: "none",
					touchAction: "pan-y",
				}}
			>
				{children}
			</body>
		</html>
	);
}

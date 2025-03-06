"use client";

import React, { JSX, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useAppContext } from "@/contexts/app-context";
import { useGSAP } from "@gsap/react";

const descriptions: string[] = [
	"Explore vibrant cityscapes",
	"Blend of tradition and modern",
	"Discover hidden treasures",
];

export default function Description() {
	return (
		<section className="relative text-xl md:text-[4vw] font-semibold md:font-normal mt-[40vh] md:mt-[35vh] mb-[10vh] px-6 md:px-[10vw] z-10">
			{descriptions.map((desc) => (
				<AnimatedText key={desc}>{desc}</AnimatedText>
			))}
		</section>
	);
}

function AnimatedText({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	const { isIntroCompleted } = useAppContext();

	const textRef = useRef<HTMLParagraphElement>(null);

	const gsapCtx = useGSAP((self) => {
		gsap.registerPlugin(ScrollTrigger);

		let tl: gsap.core.Timeline;

		const init = () => {
			tl = gsap.timeline({
				scrollTrigger: {
					trigger: textRef.current,
					start: "bottom+=200px bottom",
					end: "bottom+=400px bottom",
					scrub: true,
				},
			});

			tl.add([
				gsap.fromTo(
					textRef.current,
					{ opacity: 0.3 },
					{
						opacity: 1,
						color: "rgb(226 232 240)",
						ease: "power3.out",
						duration: 1,
					}
				),
			]);
		};

		self.play = () => {
			tl?.kill();

			init();
		};
	}, []);

	useEffect(() => {
		if (isIntroCompleted) {
			gsapCtx.context.play();

			window.addEventListener("resize", () => gsapCtx.context.play());
		}

		return () => {
			window.removeEventListener("resize", () => gsapCtx.context.play());
		};
	}, [isIntroCompleted, gsapCtx.context]);

	return (
		<p
			ref={textRef}
			className="relative text-gray-800 uppercase tracking-tight leading-normal"
		>
			{children}
		</p>
	);
}

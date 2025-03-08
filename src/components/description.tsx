"use client";

import React, { JSX, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useAppContext } from "@/contexts/app-context";
import { useGSAP } from "@gsap/react";

const descriptions: string[] = [
	"Hong Kong is a city like no other, where ancient traditions blend seamlessly with modern innovation.",
	"This cosmopolitan hub is home to a unique fusion of cultures, where East meets West and the old meets the new.",
	"From the stunning skyline to the bustling streets, Hong Kong is a city that will leave you breathless and wanting more.",
];

export default function Description({}) {
	return (
		<section className="relative text-xl md:text-[4vw] font-semibold md:font-normal mt-8 mb-[10vh] px-4 py-8 z-10">
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
					start: "bottom bottom",
					end: "bottom+=400px bottom",
					scrub: true,
				},
			});

			tl.add([
				gsap.fromTo(
					textRef.current,
					{ opacity: 0.2 },
					{
						opacity: 1,
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
			className="relative text-black tracking-tight leading-loose md:leading-relaxed"
		>
			{children}
		</p>
	);
}

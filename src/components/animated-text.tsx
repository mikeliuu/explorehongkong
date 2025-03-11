"use client";

import React, { JSX, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useAppContext } from "@/contexts/app-context";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	const { isIntroCompleted } = useAppContext();

	const textRef = useRef<HTMLParagraphElement>(null);

	const gsapCtx = useGSAP((self) => {
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

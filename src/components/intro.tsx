"use client";

import { MediaQuery } from "@/constants/media-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/contexts/app-context";
import TextMarquee from "@/components/text-marquee";

const HEADING = "Explore Hong Kong";

export default function Intro() {
	const { isIntroCompleted } = useAppContext();

	const bgImgRef = useRef<HTMLDivElement>(null);

	const gsapCtx = useGSAP((self) => {
		gsap.registerPlugin(ScrollTrigger);

		let mm: gsap.MatchMedia;
		let tl: gsap.core.Timeline;

		const init = () => {
			mm = gsap.matchMedia();

			tl = gsap.timeline({
				scrollTrigger: {
					trigger: document.documentElement,
					start: "top",
					end: "15%",
					scrub: true,
				},
			});

			// mobile
			mm.add(MediaQuery.Mobile, () => {
				gsap.set(bgImgRef.current, {
					clipPath: "inset(0%)",
				});
			});

			// desktop
			mm.add(MediaQuery.Desktop, () => {
				gsap.set(bgImgRef.current, {
					clipPath: "inset(10%)",
				});

				tl.to(bgImgRef.current, {
					clipPath: "inset(0%)",
					duration: 0.5,
				});
			});
		};

		self.play = () => {
			mm?.kill();
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
		<section className="overflow-hidden">
			<h1 className="sr-only">{HEADING}</h1>

			<TextMarquee
				text={HEADING}
				className="text-black text-8xl md:text-[10rem] text-nowrap font-bold text-left uppercase z-10 mb-12"
			/>

			<div
				ref={bgImgRef}
				className="relative w-full h-[80vh] md:h-[100vh] top-0"
			>
				<Image
					fill
					className="object-cover object-center"
					src="/images/hk3.avif"
					alt="Background image"
				/>
			</div>
		</section>
	);
}

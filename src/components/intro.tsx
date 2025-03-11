"use client";

import { MediaQuery } from "@/constants/media-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import { useAppContext } from "@/contexts/app-context";

export default function Intro() {
	const { isIntroCompleted } = useAppContext();

	const headingRef = useRef<HTMLHeadingElement>(null);
	const bgImgRef = useRef<HTMLDivElement>(null);

	const headingCtx = useGSAP(
		(self) => {
			let tw: gsap.core.Tween;

			const init = () => {
				if (headingRef.current) {
					const headingBlocks = Array(3)
						.fill("<span>Explore Hong Kong</span>")
						.join(" ");

					headingRef.current.innerHTML = headingBlocks;
					tw = gsap
						.to(headingRef.current, {
							xPercent: -100,
							repeat: -1,
							duration: 8,
							ease: "linear",
						})
						.totalProgress(0.5);
				}
			};

			self.play = () => {
				tw?.kill();

				init();
			};
		},
		[headingRef.current]
	);

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

			// desktop
			mm.add(MediaQuery.Desktop, () => {
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
			headingCtx.context.play();

			window.addEventListener("resize", () => gsapCtx.context.play());
		}

		return () => {
			window.removeEventListener("resize", () => gsapCtx.context.play());
		};
	}, [isIntroCompleted, gsapCtx.context, headingCtx.context]);

	return (
		<section className="overflow-hidden">
			<h1
				ref={headingRef}
				className="text-black text-8xl md:text-[10rem] text-nowrap font-bold text-left uppercase z-10 mb-12"
			>
				Explore Hong Kong
			</h1>

			<div
				ref={bgImgRef}
				className="relative w-full h-[80vh] md:h-[100vh] top-0 clip-inset-0 md:clip-inset-10 md:-mt-[5%]"
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

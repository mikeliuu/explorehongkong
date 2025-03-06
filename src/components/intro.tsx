"use client";

import image2 from "@/app/images/hk2.avif";
import image3 from "@/app/images/hk3.avif";

import { MediaQuery } from "@/constants/media-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import { useAppContext } from "@/contexts/app-context";

export default function Intro() {
	const { isIntroCompleted } = useAppContext();

	const bgImgRef = useRef<HTMLDivElement>(null);
	const introImgRef = useRef<HTMLDivElement>(null);

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
					end: "25%",
					scrub: true,
				},
			});

			// mobile
			mm.add(MediaQuery.Mobile, () => {
				gsap.set(introImgRef.current, {
					height: "auto",
				});
			});

			// desktop
			mm.add(MediaQuery.Desktop, () => {
				gsap.set(introImgRef.current, {
					width: "100%",
				});

				tl.to(bgImgRef.current, {
					clipPath: "inset(0%)",
					duration: 1,
				}).to(
					introImgRef.current,
					{
						height: "100px",
					},
					0
				);
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
		<section>
			<div
				ref={bgImgRef}
				className="absolute w-full h-[100vh] md:h-[120vh] top-0 filter brightness-[50%] clip-inset-0 md:clip-inset-10"
			>
				<Image
					fill
					className="object-cover object-center"
					src={image3.src}
					alt="Background image"
				/>
			</div>

			<div className="flex justify-center items-center mt-[45vh] md:mt-[40vh]">
				<div
					ref={introImgRef}
					data-scroll
					data-scroll-speed="0.5"
					className="absolute max-w-[350px] w-full aspect-[4/6] filter brightness-[65%]"
				>
					<Image
						fill
						className="object-cover object-center p-8 md:p-0"
						src={image2.src}
						alt="Intro image"
					/>
				</div>

				<h1
					data-scroll
					data-scroll-speed="0.5"
					className="text-slate-200 text-[7vw] font-bold text-center uppercase z-10"
				>
					Discover Vibrant Culture
				</h1>
			</div>
		</section>
	);
}

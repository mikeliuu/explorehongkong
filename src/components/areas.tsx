"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import { useAppContext } from "@/contexts/app-context";

interface Area {
	name: string;
	src: string;
}

const areas: Area[] = [
	{
		name: "Hong Kong Island",
		src: "/images/hk3.avif",
	},
	{
		name: "Kowloon",
		src: "/images/hk7.avif",
	},
	{
		name: "New Territories",
		src: "/images/hk5.avif",
	},
];

export default function Areas() {
	const { isIntroCompleted } = useAppContext();

	const areasRef = useRef<HTMLDivElement>(null);

	const gsapCtx = useGSAP(
		(self) => {
			gsap.registerPlugin(ScrollTrigger);

			let tl: gsap.core.Timeline;

			const init = () => {
				if (areasRef.current) {
					tl = gsap.timeline({
						scrollTrigger: {
							trigger: areasRef.current,
							start: "top-=100px top",
							end: "+=" + areasRef.current.offsetWidth,
							scrub: true,
							pin: true,
							anticipatePin: 1,
						},
					});

					tl.to(areasRef.current, {
						x:
							-(
								areasRef.current.scrollWidth -
								document.documentElement.clientWidth
							) + "px",
					});
				}
			};

			self.play = () => {
				tl?.kill();

				init();
			};
		},
		[areasRef.current]
	);

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
		<section ref={areasRef}>
			<ul className="flex flex-row gap-8 w-[800vw] h-[80vh]">
				{areas.map(({ name, src }) => (
					<li
						key={name}
						className="flex flex-col justify-center w-full max-w-[500px] md:max-w-[800px] m-4"
					>
						<div className="relative w-full aspect-[6/4]">
							<Image
								fill
								priority
								className="object-cover object-center rounded-sm"
								src={src}
								alt={name}
							/>
						</div>

						<button className="rounded-sm bg-gray-300 hover:bg-black hover:bg-opacity-90 hover:text-slate-200 text-black font-semibold py-3 px-4 mt-8 w-full max-w-[250px] transition-all duration-150">
							Stay in {name}
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/contexts/app-context";
import Link from "next/link";

interface Area {
	name: string;
	src: string;
	id: string;
}

const areas: Area[] = [
	{
		name: "Hong Kong Island",
		src: "/images/hk3.avif",
		id: "hong-kong-island",
	},
	{
		name: "Kowloon",
		src: "/images/hk7.avif",
		id: "kowloon",
	},
	{
		name: "New Territories",
		src: "/images/hk5.avif",
		id: "new-territories",
	},
];

gsap.registerPlugin(ScrollTrigger);

export default function Areas() {
	const { isIntroCompleted } = useAppContext();

	const areasRef = useRef<HTMLDivElement>(null);
	const slideRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		let animation: gsap.core.Tween | null = null;

		const getAmountToScroll = () => {
			if (areasRef.current) {
				const raceWidth = areasRef.current.scrollWidth ?? 0;
				const offsetWidth = areasRef.current.offsetWidth ?? 0;
				return raceWidth - offsetWidth;
			}

			return 0;
		};

		const handleResize = () => {
			if (areasRef.current) {
				if (animation) {
					animation.kill();
				}

				animation = gsap.to(areasRef.current, {
					x: () => -getAmountToScroll(),
					scrollTrigger: {
						trigger: areasRef.current,
						start: "top-=30%",
						end: () => "+=" + getAmountToScroll(),
						scrub: true,
						pin: true,
						anticipatePin: 1,
						markers: true,
					},
				});
			}
		};

		if (isIntroCompleted) {
			handleResize();

			window.addEventListener("resize", () => handleResize);
		}

		return () => {
			if (animation) {
				animation.kill();
			}

			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			window.removeEventListener("resize", handleResize);
		};
	}, [isIntroCompleted]);

	return (
		<section ref={areasRef}>
			<ul className="w-max h-full overflow-hidden flex flex-row space-x-12 px-4">
				{areas.map(({ name, src, id }) => (
					<li
						key={name}
						ref={slideRef}
						id={id}
						className="w-[90vw] md:w-[70vw] h-full flex flex-col justify-center"
					>
						<div className="relative w-full aspect-[6/4]">
							<Image
								fill
								priority
								className="object-cover object-center rounded-xl"
								src={src}
								alt={name}
							/>

							<Link href={`#${id}`}>
								<button className="absolute bottom-8 left-8 rounded-xl bg-[#F7F7F7] hover:bg-black hover:text-[#F7F7F7] text-black font-semibold py-3 px-4 mt-8 w-full max-w-[250px] transition-all duration-150">
									Stay in {name}
								</button>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

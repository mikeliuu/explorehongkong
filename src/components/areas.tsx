"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/contexts/app-context";
import Link from "next/link";
import { MediaQuery } from "@/constants/media-query";
import * as React from "react";

interface CardProps {
	name: string;
	src: string;
	url: string;
}

const cards: CardProps[] = [
	{
		name: "Hong Kong Island",
		src: "/images/hk3.avif",
		url: "https://www.booking.com/district/hk/hong-kong/hongkongisland.en-gb.html",
	},
	{
		name: "Kowloon",
		src: "/images/hk7.avif",
		url: "https://www.booking.com/district/hk/hong-kong/kowloon.en-gb.html",
	},
	{
		name: "New Territories",
		src: "/images/hk5.avif",
		url: "https://www.booking.com/district/hk/hong-kong/new-territories.en-gb.html",
	},
];

gsap.registerPlugin(ScrollTrigger);

export default function Areas() {
	const { isIntroCompleted } = useAppContext();

	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let mm: gsap.MatchMedia;
		let animation: gsap.core.Tween | null = null;

		const getAmountToScroll = () => {
			if (wrapperRef.current) {
				const raceWidth = wrapperRef.current.scrollWidth ?? 0;
				const offsetWidth = wrapperRef.current.offsetWidth ?? 0;
				return raceWidth - offsetWidth;
			}

			return 0;
		};

		const handleResize = () => {
			if (wrapperRef.current) {
				if (animation) {
					mm?.kill();
					animation.kill();
				}

				mm = gsap.matchMedia();

				// desktop
				mm.add(MediaQuery.Desktop, () => {
					animation = gsap.to(wrapperRef.current, {
						x: () => -getAmountToScroll(),
						scrollTrigger: {
							trigger: wrapperRef.current,
							start: "top-=15%",
							end: () => "+=" + getAmountToScroll(),
							scrub: true,
							pin: true,
							anticipatePin: 1,
						},
					});
				});
			}
		};

		if (isIntroCompleted) {
			handleResize();

			window.addEventListener("resize", () => handleResize);
		}

		return () => {
			if (animation) {
				mm?.kill();
				animation.kill();
			}

			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			window.removeEventListener("resize", handleResize);
		};
	}, [isIntroCompleted]);

	return (
		<section ref={wrapperRef} className="mb-12">
			<ul className="w-full md:w-max h-full overflow-hidden flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 px-4 md:px-12 pb-4 md:pb-0">
				{cards.map(({ name, src, url }) => (
					<LinkCard key={name} url={url} src={src} name={name} />
				))}
			</ul>
		</section>
	);
}

function LinkCard({ url, name, src }: CardProps): React.JSX.Element {
	const { isIntroCompleted } = useAppContext();

	const cardRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		let mm: gsap.MatchMedia;
		let animation: gsap.core.Tween | null = null;

		const handleResize = () => {
			if (animation) {
				mm?.kill();
				animation.kill();
			}

			mm = gsap.matchMedia();

			// mobile
			mm.add(MediaQuery.Mobile, () => {
				gsap.set(cardRef.current, {
					yPercent: 25,
					zIndex: 1,
					easing: "power3.out",
					duration: 0.5,
				});

				animation = gsap.to(cardRef.current, {
					yPercent: 0,
					scrollTrigger: {
						trigger: cardRef.current,
						start: "top bottom",
						end: "bottom bottom",
						scrub: true,
					},
				});
			});

			mm.add(MediaQuery.Desktop, () => {
				gsap.set(cardRef.current, {
					yPercent: 0,
					zIndex: 0,
				});
			});
		};

		if (isIntroCompleted) {
			handleResize();

			window.addEventListener("resize", () => handleResize);
		}

		return () => {
			if (animation) {
				mm?.kill();
				animation.kill();
			}

			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			window.removeEventListener("resize", handleResize);
		};
	}, [isIntroCompleted]);

	return (
		<li
			ref={cardRef}
			className="w-full md:w-[70vw] h-full flex flex-col justify-center"
		>
			<div className="relative w-full aspect-[6/4]">
				<Image
					fill
					priority
					className="object-cover object-center rounded-xl"
					src={src}
					alt={name}
				/>

				<Link href={url} target="_blank">
					<button className="absolute bottom-4 left-4 md:bottom-8 md:left-8 rounded-xl bg-white hover:bg-black hover:text-white text-black font-semibold py-3 px-4 mt-8 w-max text-sm transition-all duration-150">
						Stay in {name}
					</button>
				</Link>
			</div>
		</li>
	);
}

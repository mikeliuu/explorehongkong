"use client";

import image2 from "@/app/images/hk2.avif";
import image3 from "@/app/images/hk3.avif";
import image4 from "@/app/images/hk4.avif";
import image7 from "@/app/images/hk7.avif";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/contexts/app-context";

interface Attraction {
	name: string;
	src: string;
	description: string;
}

interface AttractionCardProps {
	name: string;
	src: string;
	description: string;
	isReversed?: boolean;
}

const attractions: Attraction[] = [
	{
		name: "Mongkok Market",
		src: "/images/hk2.avif",
		description:
			"Welcome to the bustling streets of Mong Kok, one of the most densely populated areas in the world. The Mong Kok Market is a treasure trove of sights, sounds and smells, with a dazzling array of goods on display - from fresh produce to souvenirs, and from traditional Chinese medicine to avant-garde fashion. Get ready to immerse yourself in the vibrant atmosphere of this iconic Hong Kong market, where the sounds of haggling vendors and the aroma of street food will leave you wanting more.",
	},
	{
		name: "Victoria Harbour",
		src: "/images/hk3.avif",
		description:
			"Take a stroll along the majestic Victoria Harbour, one of the most iconic landmarks in Hong Kong. The harbour is a breathtaking sight to behold, with towering skyscrapers and neon lights reflecting off the water. The harbour is also home to the famous Star Ferry, which has been in operation since 1888. The ferry is a popular tourist attraction and offers stunning views of the city skyline. The harbour is also a popular spot for boat tours, which offer a unique perspective on the city's history and culture. Whether you're looking for a romantic evening cruise or a thrilling adventure, Victoria Harbour has something for everyone.",
	},
	{
		name: "Temple Street",
		src: "/images/hk4.avif",
		description:
			"Experience the vibrant energy of Temple Street, one of the most famous night markets in Hong Kong. Located in the heart of Kowloon, this bustling street is a treasure trove of eclectic goods, from antiques and collectibles to souvenirs and street food. The street is also home to fortune tellers, palm readers and face changers, adding to the area's unique charm. As the night falls, the street transforms into a dazzling display of neon lights and bustling activity, making it a must-visit destination for any traveler to Hong Kong.",
	},
	{
		name: "Choi Hung Estate",
		src: "/images/hk7.avif",
		description:
			"Choi Hung Estate, a public housing estate in the heart of Hong Kong, is a kaleidoscope of colours and a testament to the city's vibrant energy. The estate's iconic rainbow-hued buildings have become a popular spot for photography and Instagram-worthy moments, and its bustling streets are filled with the sounds of Cantonese opera, mahjong games and lively chatter.",
	},
];

export default function Attractions() {
	return (
		<section className="flex flex-col bg-background">
			<div className="flex flex-col justify-center items-center w-full h-full">
				{attractions.map(({ name, src, description }, index) => {
					const isReversed = index % 2 !== 0;

					return (
						<AttractionCard
							key={name}
							name={name}
							src={src}
							description={description}
							isReversed={isReversed}
						/>
					);
				})}
			</div>
		</section>
	);
}

function AttractionCard({
	name,
	src,
	description,
	isReversed = false,
}: AttractionCardProps) {
	const { isIntroCompleted } = useAppContext();

	const wrapperRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLDivElement>(null);

	const gsapCtx = useGSAP((self) => {
		gsap.registerPlugin(ScrollTrigger);

		let wrapperTimeline: gsap.core.Timeline;
		let titleTimeline: gsap.core.Timeline;
		let imageTimeline: gsap.core.Timeline;
		let descTimeline: gsap.core.Timeline;

		const init = () => {
			wrapperTimeline = gsap
				.timeline({
					scrollTrigger: {
						trigger: wrapperRef.current,
						start: "top bottom",
						end: "bottom-=10% bottom",
						scrub: false,
					},
				})
				.fromTo(
					wrapperRef.current,
					{
						scale: 0.6,
					},
					{
						scale: 1,
					}
				);

			titleTimeline = gsap
				.timeline({
					scrollTrigger: {
						trigger: titleRef.current,
						start: "top+500px bottom",
						end: "bottom+=100px bottom",
						scrub: false,
					},
				})
				.fromTo(
					titleRef.current,
					{
						opacity: 0,
					},
					{
						opacity: 1,
						ease: "power3.out",
					}
				);

			imageTimeline = gsap
				.timeline({
					scrollTrigger: {
						trigger: imageRef.current,
						start: "0 bottom",
						end: "bottom+=200px bottom",
						scrub: false,
					},
				})
				.fromTo(
					imageRef.current,
					{
						opacity: 0,
						yPercent: -15,
					},
					{
						opacity: 1,
						yPercent: 0,
						ease: "power1.out",
					}
				);

			descTimeline = gsap
				.timeline({
					scrollTrigger: {
						trigger: descRef.current,
						start: "0 bottom",
						end: "bottom+=200px bottom",
						scrub: false,
					},
				})
				.fromTo(
					descRef.current,
					{
						opacity: 0,
						yPercent: -25,
					},
					{
						opacity: 1,
						yPercent: 0,
						ease: "power3.out",
					}
				);
		};

		self.play = () => {
			wrapperTimeline?.kill();
			titleTimeline?.kill();
			imageTimeline?.kill();
			descTimeline?.kill();

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
		<div className="sticky top-0 h-[100vh] bg-background bg-opacity-80  py-20 px-12 md:px-[10vw]">
			<div ref={wrapperRef}>
				<p
					ref={titleRef}
					className="w-full text-2xl tracking-tight font-semibold uppercase my-4"
				>
					{name}
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 justify-center items-start md:items-center w-full py-4">
					<div
						ref={imageRef}
						className={cn(
							"relative w-full aspect-video md:aspect-[4/5] filter brightness-[80%]",
							{
								"md:order-2": isReversed,
							}
						)}
					>
						<Image
							className="object-cover object-center"
							fill
							src={src}
							alt={name}
						/>
					</div>

					<div
						ref={descRef}
						className={cn(
							"flex text-md md:text-lg w-full mt-4 md:mt-0 leading-snug tracking-wider",
							{
								"md:order-1": isReversed,
							}
						)}
					>
						{description}
					</div>
				</div>
			</div>
		</div>
	);
}

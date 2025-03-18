"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IntroStatus, useAppContext } from "@/contexts/app-context";
import Image from "next/image";

const images = [
	"/images/hk1.avif",
	"/images/hk2.avif",
	"/images/hk3.avif",
	"/images/hk4.avif",
	"/images/hk5.avif",
	"/images/hk6.avif",
	"/images/hk7.avif",
	"/images/hk8.avif",
];

export default function OverlayIntro() {
	const { setIntroStatus } = useAppContext();

	const overlayRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	const [imageIndex, setImageIndex] = useState(0);

	useLayoutEffect(() => {
		window.document.body.style.pointerEvents = "none";
		window.document.body.style.overflow = "hidden";
		window.document.body.style.height = "100%";

		// switch image
		const interval = setInterval(() => {
			setImageIndex((prev) => (prev + 1) % images.length);
		}, 150);

		// fade in image
		gsap.to(imageRef.current, {
			scale: 1,
			duration: 0.5,
			ease: "expo.out",
			onStart: () => {
				setIntroStatus(IntroStatus.InProgress);
			},
		});

		// hide images in about 3 seconds
		gsap.to(imageRef.current, {
			opacity: 0,
			ease: "expo.out",
			delay: 3,
			duration: 0.5,
			onComplete: () => {
				clearInterval(interval);

				window.document.body.style.pointerEvents = "auto";
				window.document.body.style.overflow = "auto";
				window.document.body.style.height = "auto";

				window.scrollTo(0, 0);

				// set to completed to trigger main page animation
				setIntroStatus(IntroStatus.Completed);
			},
		});

		// fade out overlay in 2 seconds
		gsap.to(overlayRef.current, {
			display: "hidden",
			opacity: 0,
			zIndex: -1,
			duration: 1,
			ease: "expo.out",
			delay: 3.5,
		});

		return () => {
			clearInterval(interval);
		};
	}, [setIntroStatus]);

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 flex items-center justify-center bg-background z-50 pointer-events-none"
		>
			<div
				ref={imageRef}
				className="flex aspect-video items-center justify-center rounded-sm bg-cover bg-center bg-transparent-80 scale-0 w-72 sm:w-96"
			>
				<Image
					fill
					priority
					className="object-cover object-center filter brightness-[65%] rounded-lg"
					src={images[imageIndex]}
					alt="overlay image"
				/>

				<span className="shadow-sm text-xl sm:text-2xl text-center font-bold uppercase font-heading text-slate-200 z-10">
					Explore Hong Kong
				</span>
			</div>
		</div>
	);
}

"use client";

import image1 from "@/app/images/hk1.avif";
import image2 from "@/app/images/hk2.avif";
import image3 from "@/app/images/hk3.avif";
import image4 from "@/app/images/hk4.avif";
import image5 from "@/app/images/hk5.avif";
import image6 from "@/app/images/hk6.avif";
import image7 from "@/app/images/hk7.avif";
import image8 from "@/app/images/hk8.avif";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IntroStatus, useAppContext } from "@/contexts/app-context";
import Image from "next/image";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

export default function OverlayIntro() {
	const { setIntroStatus } = useAppContext();

	const overlayRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	const [imageIndex, setImageIndex] = useState(0);

	useLayoutEffect(() => {
		window.document.body.style.position = "fixed";

		// switch image
		const interval = setInterval(() => {
			setImageIndex((prev) => (prev + 1) % images.length);
		}, 250);

		// fade in image
		gsap.to(imageRef.current, {
			scale: 1,
			duration: 1,
			delay: 0.5,
			ease: "expo.out",
			onStart: () => {
				setIntroStatus(IntroStatus.InProgress);
			},
		});

		// hide images in about 2 seconds
		gsap.to(imageRef.current, {
			opacity: 0,
			ease: "expo.out",
			delay: 1.9,
		});

		// fade out overlay in 2 seconds
		gsap.to(overlayRef.current, {
			display: "hidden",
			opacity: 0,
			zIndex: -1,
			duration: 1,
			ease: "expo.out",
			delay: 2,
			onComplete: () => {
				clearInterval(interval);
				window.document.body.style.position = "unset";

				// set to completed to trigger main page animation
				setIntroStatus(IntroStatus.Completed);
			},
		});

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 flex items-center justify-center bg-background z-50 pointer-events-none"
		>
			<div
				ref={imageRef}
				className="flex aspect-video items-center justify-center rounded-sm bg-cover bg-center bg-transparent-80 scale-0 w-64 sm:w-96"
			>
				<Image
					className="object-cover object-center filter brightness-[65%]"
					fill
					src={images[imageIndex].src}
					alt="overlay image"
				/>

				<span className="shadow-sm text-xl sm:text-2xl text-center font-bold uppercase font-heading text-slate-200 z-10">
					Explore Hong Kong
				</span>
			</div>
		</div>
	);
}

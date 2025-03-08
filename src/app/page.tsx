"use client";

import Description from "@/components/description";
import Intro from "@/components/intro";
import Attractions from "@/components/attractions";
import { useLayoutEffect } from "react";
import OverlayIntro from "@/components/overlay-intro";
import Header from "@/components/header";

export default function Home() {
	// init smooth scroll
	useLayoutEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;

			new LocomotiveScroll();
		})();
	}, []);

	return (
		<main>
			<OverlayIntro />
			<Header />
			<Intro />
			<Description />
			<Attractions />
		</main>
	);
}

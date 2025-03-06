"use client";

import Description from "@/components/description";
import Intro from "@/components/intro";
import Attractions from "@/components/attractions";
import { useLayoutEffect } from "react";
import OverlayIntro from "@/components/overlay-intro";

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
			<Intro />
			<Description />
			<Attractions />
		</main>
	);
}

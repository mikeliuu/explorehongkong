"use client";

import { useLayoutEffect } from "react";

export default function LocomotiveScroll() {
	// init smooth scroll
	useLayoutEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;

			new LocomotiveScroll();
		})();
  }, []);
  
  return <></>;
}

"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GMT_ZONE = 8;

const padTime = (time: number) => time.toString().padStart(2, "0");

interface LocalTimeProps {
	className?: string;
}

export default function LocalTime({ className }: LocalTimeProps) {
	const localTimeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let localDate: Date;

		// get local time every second
		const timeTick = setInterval(() => {
			if (localTimeRef.current) {
				localDate = new Date(new Date().getTime() + GMT_ZONE * 60 * 60 * 1000);

				const localHours = padTime(localDate.getUTCHours());
				const localMintues = padTime(localDate.getUTCMinutes());
				const localSeconds = padTime(localDate.getUTCSeconds());

				localTimeRef.current.innerText = `${localHours}:${localMintues}:${localSeconds}`;
			}
		}, 1000);

		return () => {
			clearInterval(timeTick);
		};
	}, [localTimeRef.current]);

	return (
		<div className={cn("flex flex-col", className)}>
			<div>Local Time</div>
			<div ref={localTimeRef} className="text-sm text-black" />
		</div>
	);
}

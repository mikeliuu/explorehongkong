"use client";

import { cn } from "@/lib/utils";
import { fetchWeather } from "@/lib/weather-api";
import { useEffect, useState } from "react";

interface TemperatureProps {
	className?: string;
}

export default function Temperature({ className }: TemperatureProps) {
	const [temperature, setTemperature] = useState<number>(0);

	useEffect(() => {
		const fetchTemperature = async () => {
			console.log(process.env.NEXT_PUBLIC_WHEATHER_API_KEY);

			const res = await fetchWeather("hong%20kong");

			if (res?.current) {
				setTemperature(res.current.temp_c);
			}
		};

		fetchTemperature();
	}, []);

	return (
		!!temperature && (
			<div className={cn("flex flex-col", className)}>
				<div>Temperature</div>
				<div>{temperature}°C</div>
			</div>
		)
	);
}

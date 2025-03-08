import { WeatherResponse } from "@/constants/weather";

export const fetchWeather = async (
	query: string
): Promise<WeatherResponse | undefined> => {
	try {
		const url = `http://api.weatherapi.com/v1/current.json?key=${process.env
			.NEXT_PUBLIC_WHEATHER_API_KEY!}&q=${query}`;

		const response = await fetch(url);

		return response.json();
	} catch (error) {
		console.error({ error });
	}
};

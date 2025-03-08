import Description from "@/components/description";
import Intro from "@/components/intro";
import OverlayIntro from "@/components/overlay-intro";
import Header from "@/components/header";
import Areas from "@/components/areas";
import LocomotiveScroll from "@/components/locomotive-scroll";
import { fetchWeather } from "@/server/actions/weather-api";

export default async function Home() {
	const temperature = await fetchWeather("hong%20kong");

	return (
		<>
			<LocomotiveScroll />

			<main className="overflow-hidden">
				<OverlayIntro />
				<Header temperature={temperature?.current.temp_c} />
				<Intro />
				<Description />
				<Areas />
			</main>
		</>
	);
}

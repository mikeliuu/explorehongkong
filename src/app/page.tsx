import AnimatedText from "@/components/animated-text";
import Intro from "@/components/intro";
import OverlayIntro from "@/components/overlay-intro";
import Header from "@/components/header";
import Areas from "@/components/areas";
import LocomotiveScroll from "@/components/locomotive-scroll";
import { fetchWeather } from "@/server/actions/weather-api";
import Footer from "@/components/footer";
import Contact from "@/components/contact";

const descriptions: string[] = [
	"Hong Kong is a city like no other, where ancient traditions blend seamlessly with modern innovation.",
	"This cosmopolitan hub is home to a unique fusion of cultures, where East meets West and the old meets the new.",
	"From the stunning skyline to the bustling streets, Hong Kong is a city that will leave you breathless and wanting more.",
];

export default async function Home() {
	const temperature = await fetchWeather("hong%20kong");

	const Description = () => (
		<section className="relative text-xl md:text-[4vw] py-8 px-4 md:px-12">
			{descriptions.map((desc) => (
				<AnimatedText key={desc}>{desc}</AnimatedText>
			))}
		</section>
	);

	return (
		<div className="bg-white">
			<LocomotiveScroll />

			<section className="overflow-hidden">
				<OverlayIntro />
			</section>
			<Header temperature={temperature?.current.temp_c} />
			<main className="overflow-hidden ">
				<Intro />
				<Description />
				<Areas />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}

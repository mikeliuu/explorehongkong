import AnimatedText from "@/components/animated-text";
import Intro from "@/components/intro";
import OverlayIntro from "@/components/overlay-intro";
import Header from "@/components/header";
import Areas from "@/components/areas";
import LocomotiveScroll from "@/components/locomotive-scroll";
import { fetchWeather } from "@/server/actions/weather-api";

const descriptions: string[] = [
	"Hong Kong is a city like no other, where ancient traditions blend seamlessly with modern innovation.",
	"This cosmopolitan hub is home to a unique fusion of cultures, where East meets West and the old meets the new.",
	"From the stunning skyline to the bustling streets, Hong Kong is a city that will leave you breathless and wanting more.",
];

export default async function Home() {
	const temperature = await fetchWeather("hong%20kong");

	const Description = () => (
		<section className="relative text-xl md:text-[4vw] font-semibold md:font-normal my-12 px-4 py-8 z-10">
			{descriptions.map((desc) => (
				<AnimatedText key={desc}>{desc}</AnimatedText>
			))}
		</section>
	);

	return (
		<>
			<LocomotiveScroll />

			<main className="overflow-hidden">
				<OverlayIntro />
				<Header temperature={temperature?.current.temp_c} />
				<Intro />
				<Description />
				<Areas />
				<div className="my-8 px-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius amet
					tenetur veritatis sed quas reprehenderit libero eum sunt iste
					accusamus ab harum quisquam necessitatibus fugit sapiente, officiis
					suscipit inventore praesentium! Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Eius amet tenetur veritatis sed quas reprehenderit
					libero eum sunt iste accusamus ab harum quisquam necessitatibus fugit
					sapiente, officiis suscipit inventore praesentium! Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Eius amet tenetur veritatis sed
					quas reprehenderit libero eum sunt iste accusamus ab harum quisquam
					necessitatibus fugit sapiente, officiis suscipit inventore
					praesentium!
				</div>
			</main>
		</>
	);
}

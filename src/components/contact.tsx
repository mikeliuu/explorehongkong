import Link from "next/link";

export default function Contact() {
	return (
		<section className="bg-[#F7F7F7] text-foreground text-center flex flex-col justify-center items-center rounded-2xl py-12 px-4 mt-12 mx-20">
			<div className="text-center text-4xl font-semibold mb-8">Contact</div>

			<Link
				className="items-self-start text-5xl underline hover:text-opacity-50 hover:transition-all hover:duration-500 py-12"
				href="mailto:explorehongkong@gmail.com"
				target="_blank"
			>
				explorehongkong@gmail.com
			</Link>
		</section>
	);
}

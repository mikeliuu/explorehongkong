import Link from "next/link";

export default function Contact() {
	return (
		<section className="bg-background text-foreground text-center flex flex-col justify-center items-center rounded-2xl py-12 md:py-24 px-8 mx-4 md:mx-12">
			<div className="text-center text-lg">Contact</div>

			<Link
				className="w-full py-12 break-all whitespace-pre-wrap"
				href="mailto:explorehongkong@gmail.com"
				target="_blank"
			>
				<p className="hover:text-opacity-50 hover:transition-all hover:duration-500 text-5xl">
					explorehongkong@gmail.com
				</p>
			</Link>
		</section>
	);
}

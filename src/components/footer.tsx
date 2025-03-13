import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative w-full bg-[#F7F7F7] mt-12">
			<div className="h-[20vh] p-4 flex flex-col justify-end items-center sm:grid sm:grid-cols-3 sm:flex-row sm:justify-between sm:items-end">
				<div>©2025</div>
				<div className="sm:text-center">Explore Hong Kong</div>

				<Link
					className="mt-2 sm:justify-self-end"
					href="https://github.com/mikeliuu/explorehongkong"
					target="_blank"
				>
					mikeliuu@github
				</Link>
			</div>
		</footer>
	);
}

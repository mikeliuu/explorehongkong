import LocalTime from "@/components/local-time";
import Temperature from "@/components/temperature";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Header() {
	return (
		<header className="grid grid-cols-2 md:grid-cols-12 w-full text-sm text-black px-4 py-8 md:p-12 mb-4 md:mb-12 gap-4 md:gap-2">
			<Accomendation className="md:col-span-2" />
			<Location className="justify-self-end items-end md:col-span-2 md:items-start md:justify-self-auto" />
			<Temperature className="md:justify-self-end md:items-end md:col-start-9 md:col-span-2" />
			<LocalTime className="justify-self-end items-end md:justify-start md:col-start-11 md:col-span-2" />
		</header>
	);
}

function Accomendation({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-col", className)}>
			<div>Places to stay</div>
			<Link
				className="underline"
				href="https://www.booking.com/"
				target="_blank"
			>
				Booking.com
			</Link>
		</div>
	);
}

function Location({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-col", className)}>
			<div>Location</div>
			<Link href="https://maps.google.com/maps?q=hong%20kong" target="_blank">
				22°19&apos;N, 114°11&apos;E
			</Link>
		</div>
	);
}

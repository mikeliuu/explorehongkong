import "@/app/globals.css";
import "locomotive-scroll/dist/locomotive-scroll.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppContextProvider } from "@/contexts/app-context";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Explore Hong Kong | Discover the City's Vibrant Culture",
	description:
		"Discover the unexpected in Hong Kong, where East meets West and tradition blends with modernity. Explore hidden gems, iconic landmarks, and vibrant neighborhoods.",
	keywords:
		"Hong Kong, travel, culture, food, sights, experiences, exploration, city guide, hidden gems, interactive web",
	openGraph: {
		title: "Explore Hong Kong",
		description: "Explore the city's vibrant culture.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AppContextProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F7F7]`}
				>
					{children}
				</body>
			</html>
		</AppContextProvider>
	);
}

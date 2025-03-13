import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
	text: string;
	speed?: number; // pixels per second
	className?: string;
}

function TextMarquee({ text, speed = 50, className }: TextMarqueeProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (containerRef.current && textRef.current) {
			const containerElement = containerRef.current;
			const textElement = textRef.current;

			const containerWidth = containerElement.offsetWidth;
			const textWidth = textElement.offsetWidth;

			// calculate how many times to duplicate the text + 3 for padding
			const repetitions = Math.ceil(containerWidth / textWidth) + 3;

			let duplicatedText = "";

			for (let i = 0; i < repetitions; i++) {
				duplicatedText += text + " "; // add space for separation
			}

			// duplicate the text to create a seamless loop
			textElement.innerHTML = duplicatedText;

			const totalWidth = textElement.offsetWidth;
			const duration = totalWidth / speed; // duration based on speed

			gsap.set(textElement, { x: 0 });

			gsap.to(textElement, {
				x: -totalWidth,
				duration,
				repeat: -1,
				ease: "linear",
			});
		}
	}, [text, speed]);

	return (
		<div ref={containerRef} className="overflow-hidden w-full text-nowrap">
			<span ref={textRef} className={cn("inline-block", className)}>
				{text}
			</span>
		</div>
	);
}

export default TextMarquee;

import useGuessesStore from "@/features/gameplay/stores/guesses";
import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { File, Rank } from "@/features/gameplay/types/coordinates";
import { clsx } from "clsx";

type SquareContainerProps = {
	file: File;
	rank: Rank;
	className: string;
	children: ReactNode;
};

function SquareContainer({
	children,
	file,
	rank,
	className,
}: SquareContainerProps) {
	const { setNodeRef } = useDroppable({
		id: `${file}${rank}`,
	});

	const { guesses, currentGuess } = useGuessesStore();
	const isEraserModeActive = guesses[currentGuess].isEraserModeActive;

	return isEraserModeActive ? (
		<button
			className={clsx(className, "flex")}
			ref={setNodeRef}
			key={`${file}${rank}`}
			type="button"
		>
			{children}
		</button>
	) : (
		<div className={className} ref={setNodeRef} key={`${file}${rank}`}>
			{children}
		</div>
	);
}

export default SquareContainer;

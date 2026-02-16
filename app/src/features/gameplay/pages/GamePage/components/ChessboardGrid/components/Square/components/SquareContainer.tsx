import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { File, Rank } from "@/features/gameplay/types/coordinates";
import { clsx } from "clsx";
import useGameStateStore from "@/features/gameplay/stores/gameState";
import useActionMenuStore from "@/features/gameplay/stores/actionMenu";

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

	const { removeFromBoardOfCurrentGuess } = useGameStateStore();
	const { isEraserModeActive } = useActionMenuStore();

	return isEraserModeActive ? (
		<button
			className={clsx(className, "flex")}
			onPointerDown={() =>
				removeFromBoardOfCurrentGuess(`${file}${rank}`)
			}
			ref={setNodeRef}
			key={`${file}${rank}`}
			type="button"
		>
			{children}
		</button>
	) : (
		<div
			className={clsx(className, "flex")}
			ref={setNodeRef}
			key={`${file}${rank}`}
		>
			{children}
		</div>
	);
}

export default SquareContainer;

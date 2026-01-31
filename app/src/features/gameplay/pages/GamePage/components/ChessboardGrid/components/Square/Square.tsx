import {useDroppable} from "@dnd-kit/core";
import {isSquareOnBottomEdge, isSquareOnLeftEdge} from "@/features/gameplay/utils/edgeDetection";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import PieceIcon
	from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/components/Square/components/PieceIcon";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type SquareProps = {
	file: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h",
	rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

function Square({file, rank}: SquareProps) {
	const {setNodeRef} = useDroppable({
		id: `${file}${rank}`
	});

	const { guesses, currentGuess } = useGuessesStore();

	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const fileIndex = files.indexOf(file);
	const isDark = (rank + fileIndex) % 2 === 1;

	return (
		<div
			ref={setNodeRef}
			key={`${file}${rank}`}
			className={`${isDark ? "bg-gray-400" : "bg-gray-100"} relative`}
		>
			{isSquareOnLeftEdge(file, "white") && (
				<span
					className={`absolute top-1 left-1 text-xs font-bold ${isDark ? "text-gray-100" : "text-gray-400"}`}>{rank}</span>
			)}

			{isSquareOnBottomEdge(rank, "white") && (
				<span
					className={`absolute right-1 bottom-0.5 text-xs font-bold ${isDark ? "text-gray-100" : "text-gray-400"}`}>{file}</span>
			)}

			{Object.entries(guesses[currentGuess]?.guess ?? {}).map(([coordinate, squareInfo]) => {
				if (!squareInfo) return null;
				if (coordinate !== `${file}${rank}`) return null;

				return <PieceIcon squareInfo={squareInfo} coordinate={coordinate as SquareCoordinate} />
			})}
		</div>
	)
}

export default Square;
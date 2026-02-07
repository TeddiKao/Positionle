import { useDroppable } from "@dnd-kit/core";
import {
	isSquareOnBottomEdge,
	isSquareOnLeftEdge,
} from "@/features/gameplay/utils/edgeDetection";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import PieceIcon from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/components/Square/components/PieceIcon";
import type {
	File,
	Rank,
	SquareCoordinate,
} from "@/features/gameplay/types/coordinates";
import { files } from "@/features/gameplay/constants/coordinates";
import { clsx } from "clsx";
import { getColorByDistance } from "@/features/gameplay/utils/colorComputation";
import { useDistanceDisplayStore } from "@/features/gameplay/stores/distanceDisplay";

type SquareProps = {
	file: File;
	rank: Rank;
};

function Square({ file, rank }: SquareProps) {
	const { setNodeRef } = useDroppable({
		id: `${file}${rank}`,
	});

	const { guesses, currentGuess } = useGuessesStore();

	const guessResult = guesses[currentGuess].guessResult;
	const squareResult = guessResult?.[`${file}${rank}`];
	const orientation = guesses[currentGuess].orientation;

	const { isShowingExactDistances } = useDistanceDisplayStore();

	const fileIndex = files.indexOf(file);
	const isDark = (rank + fileIndex) % 2 === 1;

	function getColorClass() {
		if (squareResult?.resultType === "correct") {
			if (isDark) {
				return "bg-green-700";
			} else {
				return "bg-green-600";
			}
		}

		if (squareResult?.resultType === "wrongPosition") {
			if (squareResult.taxiDistance === null) return;

			return getColorByDistance(squareResult?.taxiDistance, isDark);
		}

		if (squareResult?.resultType === "notInGame") {
			if (isDark) {
				return "bg-gray-700";
			} else {
				return "bg-gray-600";
			}
		}

		if (isDark) {
			return "bg-gray-400";
		} else {
			return "bg-gray-100";
		}
	}

	return (
		<div
			ref={setNodeRef}
			key={`${file}${rank}`}
			className={clsx(getColorClass(), "relative")}
		>
			{isSquareOnLeftEdge(file, orientation) && (
				<span
					className={`absolute top-1 left-1 text-xs font-bold ${isDark ? "text-gray-100" : "text-gray-400"}`}
				>
					{rank}
				</span>
			)}

			{isSquareOnBottomEdge(rank, orientation) && (
				<span
					className={`absolute right-1 bottom-0.5 text-xs font-bold ${isDark ? "text-gray-100" : "text-gray-400"}`}
				>
					{file}
				</span>
			)}

			{isShowingExactDistances && (
				<span
					className={clsx(
						"absolute top-0 bottom-0 left-0 right-0 text-4xl flex flex-row items-center justify-center z-50 font-bold",
						(() => {
							const coordinate = `${file}${rank}`;
							const guess = guesses[currentGuess]?.guess;
							const color =
								guess?.[coordinate as SquareCoordinate]?.color;

							if (!color) return "";

							return color === "white"
								? "text-gray-950"
								: "text-gray-50";
						})(),
					)}
				>
					{squareResult?.taxiDistance ?? ""}
				</span>
			)}

			{Object.entries(guesses[currentGuess]?.guess ?? {}).map(
				([coordinate, squareInfo]) => {
					if (!squareInfo) return null;
					if (coordinate !== `${file}${rank}`) return null;

					return (
						<PieceIcon
							key={coordinate}
							squareInfo={squareInfo}
							coordinate={coordinate as SquareCoordinate}
						/>
					);
				},
			)}
		</div>
	);
}

export default Square;

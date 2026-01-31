import {isSquareOnBottomEdge, isSquareOnLeftEdge} from "@/features/gameplay/utils/edgeDetection";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import Square from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/components/Square";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import {DndContext} from "@dnd-kit/core";

function ChessboardGrid() {
	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

	const {currentGuess, guesses} = useGuessesStore();

	return (
		<div className="grid grid-cols-8 w-full aspect-square shadow-lg shadow-gray-600">
			{ranks.map((rank) => (
				files.map((file, fileIndex) => {
					const isDark = (rank + fileIndex) % 2 === 1;

					return (
						<div
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

							{Object.entries(guesses[currentGuess].guess).map(([coordinate, squareInfo]) => {
								if (!squareInfo) return null;
								if (coordinate !== `${file}${rank}`) return null;

								return (
									<DndContext>
										<Square color={squareInfo.color} piece={squareInfo.piece}
												  coordinate={coordinate as SquareCoordinate}
												  key={`${coordinate} ${squareInfo.color} ${squareInfo.piece}`}/>
									</DndContext>)
							})}
						</div>
					)
				})
			))}
		</div>
	)
}

export default ChessboardGrid;
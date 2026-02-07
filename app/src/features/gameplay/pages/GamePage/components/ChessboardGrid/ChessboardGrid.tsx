import Square from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/components/Square/Square";
import { files, ranks } from "@/features/gameplay/constants/coordinates";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import type { File, Rank } from "@/features/gameplay/types/coordinates";

function ChessboardGrid() {
	const { guesses, currentGuess } = useGuessesStore();

	const orientation = guesses[currentGuess].orientation;

	return (
		<div className="grid grid-cols-8 w-full aspect-square shadow-lg shadow-gray-600">
			{orientation === "white"
				? ranks.map((rank) =>
						files.map((file) => {
							return (
								<Square
									key={`${file}${rank}`}
									file={file as File}
									rank={rank as Rank}
								/>
							);
						}),
					)
				: ranks.reverse().map((rank) =>
						files.reverse().map((file) => {
							return (
								<Square
									key={`${file}${rank}`}
									file={file as File}
									rank={rank as Rank}
								/>
							);
						}),
					)}
		</div>
	);
}

export default ChessboardGrid;

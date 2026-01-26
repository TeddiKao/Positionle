import PawnLogo from "../icons/logo/PawnLogo";
import LeftArrow from "../icons/guessNavigator/LeftArrow";
import RightArrow from "../icons/guessNavigator/RightArrow";
import {isSquareOnBottomEdge, isSquareOnLeftEdge} from "../utils/edgeDetection";

function GamePage() {
	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

	return (
		<div className="flex flex-col items-center gap-4">
			<span className="flex flex-row items-end text-3xl font-bold mt-2 font-logo">
				{/* Pawn logo is used in place of the letter "i" */}
				<span>Pos</span>
				<PawnLogo className="inline-flex w-8 h-8 -ml-1" />
				<span className="-ml-1">t</span>
				<PawnLogo className="inline-flex w-8 h-8 -ml-1" />
				<span className="-ml-1">onle</span>
			</span>

			<div className="flex flex-row items-center gap-2 px-2 py-1 rounded-lg shadow-md bg-gray-50 shadow-gray-400">
				<button aria-label="Previous guess" type="button" className="cursor-pointer">
					<LeftArrow />
				</button>

				<p>Guess 1 of 6</p>

				<button aria-label="Next guess" type="button" className="cursor-pointer">
					<RightArrow />
				</button>
			</div>

			<div className="grid grid-cols-8 w-full max-w-md aspect-square shadow-lg shadow-gray-600">
				{ranks.map((rank) => (
					files.map((file, fileIndex) => {
						const isDark = (rank + fileIndex) % 2 === 1;

						return (
							<div
								key={`${file}${rank}`}
								className={`${isDark ? "bg-gray-400" : "bg-gray-100"} relative`}
							>
								{isSquareOnLeftEdge(file, "white") && (
									<span className="absolute top-0 left-0">{rank}</span>
								)}

								{isSquareOnBottomEdge(rank, "white") && (
									<span className="absolute bottom-0 right-0">{file}</span>
								)}
							</div>
						)
					})
				))}
			</div>
		</div>
	)
}

export default GamePage;
import PawnLogo from "../icons/logo/PawnLogo";
import LeftArrow from "../icons/guessNavigator/LeftArrow";
import RightArrow from "../icons/guessNavigator/RightArrow";
import {isSquareOnBottomEdge, isSquareOnLeftEdge} from "../utils/edgeDetection";
import {Button} from "@/components/ui/button";
import Eraser from "@/features/gameplay/icons/actionMenu/Eraser";
import TrashCan from "@/features/gameplay/icons/actionMenu/TrashCan";
import Flip from "@/features/gameplay/icons/actionMenu/Flip";
import {blackPieceIcons, whitePieceIcons} from "@/features/gameplay/constants/pieceIcons";

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
				<button aria-label="Previous guess" type="button">
					<LeftArrow />
				</button>

				<p>Guess 1 of 6</p>

				<button aria-label="Next guess" type="button">
					<RightArrow />
				</button>
			</div>

			<div className="grid grid-cols-3 w-full justify-center gap-4">
				<div className="flex flex-row justify-end items-center">
					<div className="flex flex-row w-max p-1 rounded-md shadow-md shadow-gray-400">
						<div className="flex flex-col">
							{Object.entries(whitePieceIcons).map(([abbreviation, icon]) => (
								<button key={abbreviation} type="button" className="hover:bg-gray-400 rounded-md">
									<img className="w-12 h-12" src={icon} alt={abbreviation} />
								</button>
							))}
						</div>

						<div className="flex flex-col">
							{Object.entries(blackPieceIcons).map(([abbreviation, icon]) => (
								<button type="button" key={abbreviation} className="hover:bg-gray-400 rounded-md">
									<img className="w-12 h-12" src={icon} alt={abbreviation} />
								</button>
							))}
						</div>
					</div>
				</div>

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
										<span className={`absolute top-1 left-1 text-xs font-bold ${isDark ? "text-gray-100" : "text-gray-400"}`}>{rank}</span>
									)}

									{isSquareOnBottomEdge(rank, "white") && (
										<span className={`absolute right-1 bottom-0.5 text-xs font-bold ${isDark ? "text-gray-100" : "text-gray-400"}`}>{file}</span>
									)}
								</div>
							)
						})
					))}
				</div>

				<div className="flex flex-col justify-center">
					<div className="flex flex-col shadow-gray-400 shadow-md w-max p-1 gap-2 rounded-md">
						<button aria-label="Eraser mode (remove a piece)" type="button" className="hover:bg-gray-400 rounded-md">
							<Eraser />
						</button>

						<button aria-label="Clear board" type="button" className="hover:bg-gray-400 rounded-md">
							<TrashCan />
						</button>

						<button aria-label="Flip board" type="button" className="hover:bg-gray-400 rounded-md">
							<Flip />
						</button>
					</div>
				</div>
			</div>

			<Button type="button" className="w-full max-w-md hover:opacity-90">Check</Button>
		</div>
	)
}

export default GamePage;
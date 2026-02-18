import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import StaticChessboard from "@/features/gameplay/components/GameEndModal/components/StaticChessboard/StaticChessboard";
import {
	correctPositionColorClasses,
	correctPositionDemonstration,
	notInGameDemonstration,
	notInGameColorClasses,
	wrongLocationDemonstration,
	wrongLocationColorClasses,
	wrongLocationDistances,
	multiPieceDemonstration,
	multiPieceColorClasses,
	multiPieceDistances,
} from "@/features/gameplay/constants/playDemonstration";

function HowToPlayModal() {
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-bold">
						How to play
					</DialogTitle>
					<DialogDescription className="text-center">
						Guess the chess position within 6 tries
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<p className="text-sm">
						After each guess, the color of the squares will change
						depending on your guess
					</p>
					<h3 className="font-bold">
						Examples (with the pawn on e4 as the correct
						position):{" "}
					</h3>
					<div className="grid grid-cols-2 gap-2">
						<div className="flex flex-col items-center gap-2">
							<StaticChessboard
								boardRepresentation={
									correctPositionDemonstration
								}
								squareColorClasses={correctPositionColorClasses}
							/>
							<p className="text-sm text-center">
								The pawn on e4 is in the correct position
							</p>
						</div>

						<div className="flex flex-col items-center gap-2">
							<StaticChessboard
								boardRepresentation={notInGameDemonstration}
								squareColorClasses={notInGameColorClasses}
							/>
							<p className="text-sm text-center">
								The knight on d4 is not in the game on any spot
							</p>
						</div>

						<div className="flex flex-col items-center gap-2">
							<StaticChessboard
								boardRepresentation={wrongLocationDemonstration}
								squareColorClasses={wrongLocationColorClasses}
								squareDistances={wrongLocationDistances}
							/>
							<p className="text-sm text-center">
								The pawn is in the game but on the wrong square.
								The number (6) shows how far away it is: rank
								distance (2) + file distance (4).
							</p>
						</div>

						<div className="flex flex-col items-center gap-2">
							<StaticChessboard
								boardRepresentation={multiPieceDemonstration}
								squareColorClasses={multiPieceColorClasses}
								squareDistances={multiPieceDistances}
							/>
							<p className="text-sm text-center">
								If there are multiple identical pieces, each one
								is matched to the closest correct square. Only
								the closest match shows a distance; extra
								guesses are shown as not in the game.
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default HowToPlayModal;

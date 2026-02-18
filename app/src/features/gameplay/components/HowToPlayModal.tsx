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
					<h3 className="font-bold">Examples: </h3>
					<div className="grid grid-cols-2">
						<StaticChessboard
							boardRepresentation={correctPositionDemonstration}
							squareColorClasses={correctPositionColorClasses}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default HowToPlayModal;

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/ChessboardGrid";

function GameEndModal() {
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-xl">
						You guessed it!
					</DialogTitle>

					<DialogDescription className="text-center">
						The position was:
					</DialogDescription>
				</DialogHeader>

				<ChessboardGrid />
			</DialogContent>
		</Dialog>
	);
}

export default GameEndModal;

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import StaticChessboard from "@/features/gameplay/components/GameEndModal/components/StaticChessboard/StaticChessboard";
import useGameEndModalStore from "@/features/gameplay/stores/gameEndModal";
import { Button } from "@/components/ui/button";
import useGameStateStore from "@/features/gameplay/stores/gameState";
import useGuessInfoStore from "@/features/gameplay/stores/guessInfo";
import useAnnotationToolbarStore from "@/features/gameplay/stores/annotationToolbar";
import useActionMenuStore from "@/features/gameplay/stores/actionMenu";

function GameEndModal() {
	const { correctPositionInfo, hasCorrectlyGuessed, resetGameState } =
		useGameStateStore();
	const { resetGuessInfoState } = useGuessInfoStore();
	const { resetActionMenuState } = useActionMenuStore();
	const { resetAnnotationToolbarState } = useAnnotationToolbarStore();

	const { isOpen, openGameEndModal, closeModal } = useGameEndModalStore();

	if (!correctPositionInfo) return null;

	function playAgain() {
		resetGameState();
		resetGuessInfoState();
		resetActionMenuState();
		resetAnnotationToolbarState();

		closeModal();
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (open) {
					openGameEndModal();
				} else {
					closeModal();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-xl">
						{hasCorrectlyGuessed
							? "You guessed it!"
							: "Better luck next time"}
					</DialogTitle>

					<DialogDescription className="text-center">
						The position was:
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 items-center">
					<StaticChessboard
						boardRepresentation={
							correctPositionInfo.correctPosition
						}
					/>

					<div className="flex flex-col items-center">
						<p className="text-sm">{correctPositionInfo.source}</p>
						<p className="font-bold text-xl">
							{correctPositionInfo.whitePlayer} vs{" "}
							{correctPositionInfo.blackPlayer}
						</p>
						{correctPositionInfo.caption.trim() && (
							<p className="text-sm text-muted-foreground">
								{correctPositionInfo.caption}
							</p>
						)}
					</div>
				</div>

				<DialogFooter>
					<Button
						type="button"
						onClick={playAgain}
						className="w-full hover:opacity-90"
					>
						Play again
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default GameEndModal;

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import StaticChessboard from "@/features/gameplay/components/GameEndModal/components/StaticChessboard/StaticChessboard";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import useGameEndModalStore from "@/features/gameplay/stores/gameEndModal";
import { Button } from "@/components/ui/button";

function GameEndModal() {
	const { correctPositionInfo, hasCorrectlyGuessed, performReset } =
		useGuessesStore();
	const { isOpen, openModal, closeModal } = useGameEndModalStore();

	if (!correctPositionInfo) return null;

	function playAgain() {
		closeModal();
		performReset();
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (open) {
					openModal();
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
						{correctPositionInfo.caption && (
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

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import StaticChessboard from "@/features/gameplay/components/GameEndModal/components/StaticChessboard/StaticChessboard";
import useGuessesStore from "@/features/gameplay/stores/guesses";

function GameEndModal() {
	const { correctPosition } = useGuessesStore();

	if (!correctPosition) return null;

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

				<div className="flex flex-col gap-4 items-center">
					<StaticChessboard boardRepresentation={correctPosition} />

					<div className="flex flex-col items-center">
						<p className="text-sm">World Cup 2025</p>
						<p className="font-bold text-xl">
							Magnus Carlsen vs Hikaru Nakamura
						</p>
						<p className="text-sm text-muted-foreground">
							"Random caption"
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default GameEndModal;

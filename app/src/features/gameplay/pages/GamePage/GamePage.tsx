import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu";
import CheckAnswerButton from "@/features/gameplay/pages/GamePage/components/CheckAnswerButton";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";
import {getPieceInfoFromAbbreviation} from "@/features/gameplay/utils/abbreviations";
import type {PieceAbbreviation} from "@/features/gameplay/types/abbreviations";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

function GamePage() {
	const { addToBoard } = useGuessesStore();

	function handleDragEnd(event: DragEndEvent) {
		if (event.over) {
			if (!event.active.id) return null;
			if (!event.over.id) return null;

			const draggedPieceInfo = getPieceInfoFromAbbreviation(event.active.id as PieceAbbreviation);
			const droppedCoordinate = event.over.id as SquareCoordinate;

			addToBoard(droppedCoordinate, draggedPieceInfo)
		}
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<Logo />
			<GuessNavigator />

			<div className="grid grid-cols-3 w-full justify-center gap-4">
				<DndContext onDragEnd={handleDragEnd}>
					<PieceSetupMenu />
					<ChessboardGrid />
				</DndContext>


				<ActionsMenu />
			</div>

			<CheckAnswerButton />
		</div>
	)
}

export default GamePage;
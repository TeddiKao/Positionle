import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu";
import CheckAnswerButton from "@/features/gameplay/pages/GamePage/components/CheckAnswerButton";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";

function GamePage() {
	function handleDragEnd(event: DragEndEvent) {
		if (event.over) {
			console.log(event.active.id);
			console.log(event.over.id);
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
import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu";
import CheckAnswerButton from "@/features/gameplay/pages/GamePage/components/CheckAnswerButton";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { getPieceInfoFromAbbreviation } from "@/features/gameplay/utils/abbreviations";
import type { PieceAbbreviation } from "@/features/gameplay/types/abbreviations";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import type { DragMethods } from "@/features/gameplay/types/dragAndDrop";
import { useEffect } from "react";
import { dualKingsideCastlingTest } from "@/dev/testPositions";
import { randomlySelectPosition } from "@/features/gameplay/utils/positionSelection";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import GameEndModal from "@/features/gameplay/components/GameEndModal/GameEndModal";
import useGameEndModalStore from "@/features/gameplay/stores/gameEndModal";

function GamePage() {
	const {
		guesses,
		currentGuess,
		hasCorrectlyGuessed,
		usedGuesses,
		addToBoard,
		movePieceOnBoard,
		updateCorrectPositionInfo,
	} = useGuessesStore();

	const { openModal } = useGameEndModalStore();

	useEffect(() => {
		console.log("Running effect");
		// Replace "dualKingsideCastlingTest" with any position you like
		if (usedGuesses === 0 && !hasCorrectlyGuessed) {
			if (import.meta.env.VITE_USE_DEV_POSITION === "true") {
				updateCorrectPositionInfo(dualKingsideCastlingTest);
			} else {
				const selectedPositionInfo = randomlySelectPosition();
				updateCorrectPositionInfo(selectedPositionInfo);
			}
		}
	}, [updateCorrectPositionInfo, usedGuesses, hasCorrectlyGuessed]);

	useEffect(() => {
		if (hasCorrectlyGuessed) {
			openModal();
		}
	}, [hasCorrectlyGuessed, openModal]);

	useEffect(() => {
		if (usedGuesses >= 6) {
			openModal();
		}
	}, [usedGuesses, openModal]);

	function handleDragEnd(event: DragEndEvent) {
		if (event.over) {
			if (!event.active.id) return null;
			if (!event.over.id) return null;

			if (typeof event.active.id !== "string") return null;
			if (typeof event.over.id !== "string") return null;

			if (guesses[currentGuess].isSubmitted) return null;

			const [dragMethod, info] = event.active.id.split(" ");
			if ((dragMethod as DragMethods) === "from-menu") {
				const draggedPieceInfo = getPieceInfoFromAbbreviation(
					info as PieceAbbreviation,
				);
				const droppedCoordinate = event.over.id as SquareCoordinate;

				addToBoard(droppedCoordinate, draggedPieceInfo);
			} else if ((dragMethod as DragMethods) === "from-square") {
				const draggedFrom = info;
				const draggedTo = event.over.id;

				movePieceOnBoard(
					draggedFrom as SquareCoordinate,
					draggedTo as SquareCoordinate,
				);
			}
		}
	}

	return (
		<>
			<div className="flex flex-col items-center gap-4">
				<Logo />
				<GuessNavigator />

				<div className="grid grid-cols-3 w-full justify-center gap-4">
					<DndContext
						modifiers={[restrictToWindowEdges]}
						onDragEnd={handleDragEnd}
					>
						<PieceSetupMenu />
						<ChessboardGrid />
					</DndContext>

					<ActionsMenu />
				</div>

				<CheckAnswerButton />
			</div>

			<GameEndModal />
		</>
	);
}

export default GamePage;

import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu/ActionsMenu";
import CheckAnswerButton from "@/features/gameplay/pages/GamePage/components/CheckAnswerButton";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { getPieceInfoFromAbbreviation } from "@/features/gameplay/utils/abbreviations";
import type { PieceAbbreviation } from "@/features/gameplay/types/abbreviations";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import type { DragMethods } from "@/features/gameplay/types/dragAndDrop";
import { useEffect, useRef } from "react";
import { dualKingsideCastlingTest } from "@/dev/testPositions";
import { randomlySelectPosition } from "@/features/gameplay/utils/positionSelection";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import GameEndModal from "@/features/gameplay/components/GameEndModal/GameEndModal";
import useGameEndModalStore from "@/features/gameplay/stores/gameEndModal";
import {
	ReactSketchCanvas,
	type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { clsx } from "clsx";

function GamePage() {
	const {
		guesses,
		currentGuess,
		hasCorrectlyGuessed,
		usedGuesses,
		addToBoard,
		movePieceOnBoard,
		updateCorrectPositionInfo,
		updateAnnotations,
	} = useGuessesStore();

	const { openModal } = useGameEndModalStore();

	const isPenActive = useGuessesStore(
		(state) => state.guesses[state.currentGuess].isPenActive,
	);
	const isAnnotationEraserActive = useGuessesStore(
		(state) =>
			state.guesses[state.currentGuess].annotationTools.isEraserActive,
	);

	const canvasRef = useRef<ReactSketchCanvasRef>(null);

	useEffect(() => {
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
		if (!canvasRef.current) return;
		if (hasCorrectlyGuessed) return;

		canvasRef.current.clearCanvas();
		canvasRef.current.loadPaths(guesses[currentGuess].annotations);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGuess, hasCorrectlyGuessed]);

	useEffect(() => {
		if (usedGuesses >= 6) {
			openModal();
		}
	}, [usedGuesses, openModal]);

	useEffect(() => {
		canvasRef.current?.eraseMode(isAnnotationEraserActive);
	}, [isAnnotationEraserActive]);

	async function handleStroke() {
		if (!canvasRef.current) return;

		const paths = await canvasRef.current.exportPaths();
		if (!paths) return;

		updateAnnotations(paths);
	}

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

						<div className="relative">
							<ChessboardGrid />
							<ReactSketchCanvas
								ref={canvasRef}
								className={clsx(
									"absolute top-0 bottom-0 left-0 right-0",
									isPenActive
										? "pointer-events-auto"
										: "pointer-events-none",
								)}
								onStroke={handleStroke}
								width="100%"
								height="100%"
								canvasColor="transparent"
							/>
						</div>
					</DndContext>

					<ActionsMenu canvasRef={canvasRef} />
				</div>

				<CheckAnswerButton />
			</div>

			<GameEndModal />
		</>
	);
}

export default GamePage;

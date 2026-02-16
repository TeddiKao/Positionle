import type {
	GuessInfo,
	GuessNumbers,
} from "@/features/gameplay/types/guesses";
import { create } from "zustand";

import type {
	BoardRepresentation,
	PieceColor,
} from "@/features/gameplay/types/chess";
import type { CanvasPath } from "react-sketch-canvas";

type GuessInfoStore = {
	guesses: Record<GuessNumbers, GuessInfo>;

	updateBoardForGuess: (
		guess: GuessNumbers,
		board: BoardRepresentation,
	) => void;

	updateAnnotationsForGuess: (
		guess: GuessNumbers,
		annotations: CanvasPath[],
	) => void;

	showExactDistancesForGuess: (guess: GuessNumbers) => void;
	hideExactDistancesForGuess: (guess: GuessNumbers) => void;

	updateOrientationForGuess: (
		guess: GuessNumbers,
		orientation: PieceColor,
	) => void;
};

const useGuessInfoStore = create((set) => ({}));

export default useGuessInfoStore;

import type {
	GuessInfo,
	GuessNumbers,
	GuessResult,
} from "@/features/gameplay/types/guesses";
import { create } from "zustand";

import type {
	BoardRepresentation,
	PieceColor,
} from "@/features/gameplay/types/chess";
import type { CanvasPath } from "react-sketch-canvas";
import { defaultGuessInfo } from "@/features/gameplay/constants/guesses";

type GuessInfoStore = {
	guesses: Record<GuessNumbers, GuessInfo>;

	updateBoardForGuess: (
		guessNumber: GuessNumbers,
		board: BoardRepresentation,
	) => void;

	updateAnnotationsForGuess: (
		guessNumber: GuessNumbers,
		annotations: CanvasPath[],
	) => void;

	showExactDistancesForGuess: (guessNumber: GuessNumbers) => void;
	hideExactDistancesForGuess: (guessNumber: GuessNumbers) => void;

	updateOrientationForGuess: (
		guessNumber: GuessNumbers,
		orientation: PieceColor,
	) => void;

	markGuessAsSubmitted: (guessNumber: GuessNumbers) => void;
	updateGuessResult: (
		guessNumber: GuessNumbers,
		guessResult: GuessResult,
	) => void;
};

const useGuessInfoStore = create<GuessInfoStore>((set) => ({
	guesses: {
		1: structuredClone(defaultGuessInfo),
		2: structuredClone(defaultGuessInfo),
		3: structuredClone(defaultGuessInfo),
		4: structuredClone(defaultGuessInfo),
		5: structuredClone(defaultGuessInfo),
		6: structuredClone(defaultGuessInfo),
	},

	updateBoardForGuess: (
		guessNumber: GuessNumbers,
		board: BoardRepresentation,
	) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						guess: board,
					},
				},
			};
		});
	},

	updateAnnotationsForGuess: (
		guessNumber: GuessNumbers,
		annotations: CanvasPath[],
	) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						annotations: annotations,
					},
				},
			};
		});
	},

	showExactDistancesForGuess: (guessNumber: GuessNumbers) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						isShowingExactDistances: true,
					},
				},
			};
		});
	},

	hideExactDistancesForGuess: (guessNumber: GuessNumbers) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						isShowingExactDistances: false,
					},
				},
			};
		});
	},

	updateOrientationForGuess: (
		guessNumber: GuessNumbers,
		orientation: PieceColor,
	) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						orientation: orientation,
					},
				},
			};
		});
	},

	markGuessAsSubmitted: (guessNumber) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						isSubmitted: true,
					},
				},
			};
		});
	},

	updateGuessResult: (guessNumber, guessResult) => {
		set((state) => {
			return {
				guesses: {
					...state.guesses,
					[guessNumber]: {
						...state.guesses[guessNumber],
						guessResult: guessResult,
					},
				},
			};
		});
	},
}));

export default useGuessInfoStore;

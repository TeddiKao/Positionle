import _ from "lodash";
import { create } from "zustand";
import type {
	CorrectPositionInfo,
	GuessInfo,
	GuessNumbers,
} from "@/features/gameplay/types/guesses";
import { defaultGuessInfo } from "@/features/gameplay/constants/guesses";
import type { PieceColor, SquareInfo } from "@/features/gameplay/types/chess";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import { checkAnswer } from "@/features/gameplay/utils/answerCheck";

type GuessesStore = {
	currentGuess: GuessNumbers;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	usedGuesses: 0 | GuessNumbers;
	increaseUsedGuesses: () => void;
	resetUsedGuesses: () => void;

	correctPositionInfo: CorrectPositionInfo | null;
	updateCorrectPositionInfo: (position: CorrectPositionInfo) => void;
	clearCorrectPosition: () => void;

	hasCorrectlyGuessed: boolean;
	markAsCorrectlyGuessed: () => void;

	guesses: Record<GuessNumbers, GuessInfo>;

	addToBoard: (square: SquareCoordinate, pieceInfo: SquareInfo) => void;
	removeFromBoard: (square: SquareCoordinate) => void;
	movePieceOnBoard: (from: SquareCoordinate, to: SquareCoordinate) => void;

	submitGuess: () => void;
	clearGuess: () => void;
	flipBoard: () => void;

	showExactDistances: () => void;
	hideExactDistances: () => void;

	activateEraserMode: () => void;
	deactivateEraserMode: () => void;
};

const useGuessesStore = create<GuessesStore>((set) => ({
	currentGuess: 1,
	moveToPreviousGuess: () => {
		set((state) => {
			if (state.currentGuess > 1) {
				return {
					currentGuess: (state.currentGuess - 1) as GuessNumbers,
				};
			} else {
				return { currentGuess: state.currentGuess };
			}
		});
	},
	moveToNextGuess: () => {
		set((state) => {
			if (state.currentGuess < 6) {
				return {
					currentGuess: (state.currentGuess + 1) as GuessNumbers,
				};
			} else {
				return { currentGuess: state.currentGuess };
			}
		});
	},

	usedGuesses: 0,
	increaseUsedGuesses: () => {
		set((state) => {
			if (state.usedGuesses < 6) {
				return { usedGuesses: (state.usedGuesses + 1) as GuessNumbers };
			} else {
				return { usedGuesses: state.usedGuesses };
			}
		});
	},
	resetUsedGuesses: () => {
		set({ usedGuesses: 0 });
	},

	correctPositionInfo: null,
	updateCorrectPositionInfo: (positionInfo: CorrectPositionInfo) => {
		set({ correctPositionInfo: positionInfo });
	},
	clearCorrectPosition: () => {
		set({ correctPositionInfo: null });
	},

	hasCorrectlyGuessed: false,
	markAsCorrectlyGuessed: () => {
		set({ hasCorrectlyGuessed: true });
	},

	guesses: {
		1: structuredClone(defaultGuessInfo),
		2: structuredClone(defaultGuessInfo),
		3: structuredClone(defaultGuessInfo),
		4: structuredClone(defaultGuessInfo),
		5: structuredClone(defaultGuessInfo),
		6: structuredClone(defaultGuessInfo),
	},

	addToBoard: (square, pieceInfo) => {
		set((state) => {
			const copiedBoard = structuredClone(
				state.guesses[state.currentGuess].guess,
			);
			copiedBoard[square] = pieceInfo;

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guess: copiedBoard,
					},
				},
			};
		});
	},

	removeFromBoard: (square) => {
		set((state) => {
			const copiedBoard = structuredClone(
				state.guesses[state.currentGuess].guess,
			);
			delete copiedBoard[square];

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guess: copiedBoard,
					},
				},
			};
		});
	},

	movePieceOnBoard: (from, to) => {
		set((state) => {
			const copiedBoard = structuredClone(
				state.guesses[state.currentGuess].guess,
			);
			const squareInfo = copiedBoard[from];

			if (from === to) return state;
			if (!squareInfo) return state;

			delete copiedBoard[from];

			copiedBoard[to] = squareInfo;

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guess: copiedBoard,
					},
				},
			};
		});
	},

	submitGuess: () => {
		let nextGuess: number | null = null;

		set((state) => {
			if (!state.correctPositionInfo) return {};

			const currentGuess = state.currentGuess;
			const currentGuessInfo = state.guesses[currentGuess];

			if (currentGuessInfo.isSubmitted) return {};

			const submission = currentGuessInfo.guess;
			if (!submission) return {};

			const guessResult = checkAnswer(
				state.correctPositionInfo.correctPosition,
				submission,
			);
			nextGuess = state.currentGuess + 1;

			const hasCorrectlyGuessed = _.isEqual(
				state.correctPositionInfo.correctPosition,
				currentGuessInfo.guess,
			);

			return {
				usedGuesses:
					state.usedGuesses < 6
						? ((state.usedGuesses + 1) as GuessNumbers)
						: state.usedGuesses,
				guesses: {
					...state.guesses,
					[currentGuess]: {
						...currentGuessInfo,
						guessResult,
						isSubmitted: true,
					},
				},
				hasCorrectlyGuessed,
			};
		});

		if (!nextGuess) return {};
		if (nextGuess > 6) return {};

		setTimeout(() => {
			set({ currentGuess: nextGuess as GuessNumbers });
		}, 3000);
	},

	clearGuess: () => {
		set((state) => {
			const currentGuessInfo = state.guesses[state.currentGuess];
			if (currentGuessInfo.isSubmitted) return {};

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...currentGuessInfo,
						guess: {},
					},
				},
			};
		});
	},

	flipBoard: () => {
		set((state) => {
			const currentGuessInfo = state.guesses[state.currentGuess];
			const newOrientation: PieceColor =
				currentGuessInfo.orientation === "white" ? "black" : "white";

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...currentGuessInfo,
						orientation: newOrientation,
					},
				},
			};
		});
	},

	showExactDistances: () => {
		set((state) => {
			const currentGuessInfo = state.guesses[state.currentGuess];

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...currentGuessInfo,
						isShowingExactDistances: true,
					},
				},
			};
		});
	},

	hideExactDistances: () => {
		set((state) => {
			const currentGuessInfo = state.guesses[state.currentGuess];

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...currentGuessInfo,
						isShowingExactDistances: false,
					},
				},
			};
		});
	},

	activateEraserMode: () => {
		set((state) => {
			const currentGuessInfo = state.guesses[state.currentGuess];
			if (currentGuessInfo.isSubmitted) return {};

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...currentGuessInfo,
						isEraserModeActive: true,
					},
				},
			};
		});
	},

	deactivateEraserMode: () => {
		set((state) => {
			const currentGuessInfo = state.guesses[state.currentGuess];
			if (currentGuessInfo.isSubmitted) return {};

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...currentGuessInfo,
						isEraserModeActive: false,
					},
				},
			};
		});
	},
}));

export default useGuessesStore;

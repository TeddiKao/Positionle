import type {
	CorrectPositionInfo,
	GuessInfo,
	GuessNumbers,
} from "@/features/gameplay/types/guesses";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import type {
	BoardRepresentation,
	SquareInfo,
} from "@/features/gameplay/types/chess";
import { create } from "zustand";
import { defaultGuessInfo } from "@/features/gameplay/constants/guesses";
import { checkAnswer } from "@/features/gameplay/utils/answerCheck";
import _ from "lodash";

type GameStateStore = {
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

	updatePosition: (position: BoardRepresentation) => void;

	submitGuess: () => void;
	performReset: () => void;
};

const useGameStateStore = create<GameStateStore>((set, _get, store) => ({
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

				hasCorrectlyGuessed: hasCorrectlyGuessed,
			};
		});
	},

	updatePosition: (position: BoardRepresentation) => {
		set((state) => {
			if (state.guesses[state.currentGuess].isSubmitted) return {};

			const updatedPosition = structuredClone(position);

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guess: updatedPosition,
					},
				},
			};
		});
	},

	performReset: () => {
		set(store.getInitialState());
	},
}));

export default useGameStateStore;

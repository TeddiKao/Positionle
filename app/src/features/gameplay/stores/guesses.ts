import {create} from "zustand";
import type {GuessInfo, GuessNumbers} from "@/features/gameplay/types/guesses";
import {defaultGuessInfo} from "@/features/gameplay/constants/guesses";
import type {BoardRepresentation, SquareInfo} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import {checkAnswer} from "@/features/gameplay/utils/answerCheck";

type GuessesStore = {
	currentGuess: GuessNumbers;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	usedGuesses: 0 | GuessNumbers;
	increaseUsedGuesses: () => void;
	resetUsedGuesses: () => void;

	correctPosition: BoardRepresentation | null;
	updateCorrectPosition: (position: BoardRepresentation) => void;
	clearCorrectPosition: () => void;

	guesses: Record<GuessNumbers, GuessInfo>;

	addToBoard: (square: SquareCoordinate, pieceInfo: SquareInfo) => void;
	removeFromBoard: (square: SquareCoordinate) => void;
	movePieceOnBoard: (from: SquareCoordinate, to: SquareCoordinate) => void;

	submitGuess: () => void;
}

const useGuessesStore = create<GuessesStore>((set, get) => ({
	currentGuess: 1,
	moveToPreviousGuess: () => {
		set((state) => {
			if (state.currentGuess > 1) {
				return { currentGuess: state.currentGuess - 1 as GuessNumbers }
			} else {
				return { currentGuess: state.currentGuess }
			}
		})
	},
	moveToNextGuess: () => {
		set((state) => {
			if (state.currentGuess < 6) {
				return { currentGuess: state.currentGuess + 1 as GuessNumbers }
			} else {
				return { currentGuess: state.currentGuess }
			}
		})
	},

	usedGuesses: 0,
	increaseUsedGuesses: () => {
		set((state) => {
			if (state.usedGuesses < 6) {
				return { usedGuesses: state.usedGuesses + 1 as GuessNumbers }
			} else {
				return { usedGuesses: state.usedGuesses }
			}
		})
	},
	resetUsedGuesses: () => {
		set({ usedGuesses: 0 })
	},

	correctPosition: null,
	updateCorrectPosition: (position) => {
		set({ correctPosition: structuredClone(position) })
	},
	clearCorrectPosition: () => {
		set({ correctPosition: null })
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
			const copiedBoard = structuredClone(state.guesses[state.currentGuess].guess);
			copiedBoard[square] = pieceInfo;

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guess: copiedBoard
					}
				}
			}
		})
	},

	removeFromBoard: (square) => {
		set((state) => {
			const copiedBoard = structuredClone(state.guesses[state.currentGuess].guess);
			delete copiedBoard[square];

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guess: copiedBoard
					}
				}
			}
		})
	},

	movePieceOnBoard: (from, to) => {
		set((state) => {
			const copiedBoard = structuredClone(state.guesses[state.currentGuess].guess);
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
						guess: copiedBoard
					}
				}
			}
		})
	},

	submitGuess: () => {
		set((state) => {
			if (!state.correctPosition) return {};

			const submission = state.guesses[state.currentGuess].guess;
			if (!submission) return {}

			const guessResult = checkAnswer(state.correctPosition, submission);

			get().increaseUsedGuesses();

			return {
				guesses: {
					...state.guesses,
					[state.currentGuess]: {
						...state.guesses[state.currentGuess],
						guessResult,
						isSubmitted: true
					}
				},
			}
		})
	}
}))

export default useGuessesStore;
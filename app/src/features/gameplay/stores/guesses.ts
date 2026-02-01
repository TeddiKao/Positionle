import {create} from "zustand";
import type {GuessInfo, GuessNumbers} from "@/features/gameplay/types/guesses";
import {defaultGuessInfo} from "@/features/gameplay/constants/guesses";
import type {SquareInfo} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type GuessesStore = {
	currentGuess: GuessNumbers;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	usedGuesses: 0 | GuessNumbers;
	increaseUsedGuesses: () => void;

	guesses: Record<GuessNumbers, GuessInfo>;
	addToBoard: (square: SquareCoordinate, pieceInfo: SquareInfo) => void;
	removeFromBoard: (square: SquareCoordinate) => void;
	movePieceOnBoard: (from: SquareCoordinate, to: SquareCoordinate) => void;
}

const useGuessesStore = create<GuessesStore>((set) => ({
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
	}
}))

export default useGuessesStore;
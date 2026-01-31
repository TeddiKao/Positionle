import {create} from "zustand";
import type {GuessInfo, GuessNumbers} from "@/features/gameplay/types/guesses";
import {defaultGuessInfo} from "@/features/gameplay/constants/guesses";
import type {SquareInfo} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type GuessesStore = {
	currentGuess: GuessNumbers;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	guesses: Record<GuessNumbers, GuessInfo>;
	addToBoard: (square: SquareCoordinate, pieceInfo: SquareInfo) => void;
	removeFromBoard: (square: SquareCoordinate) => void;
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

	guesses: {
		1: defaultGuessInfo,
		2: defaultGuessInfo,
		3: defaultGuessInfo,
		4: defaultGuessInfo,
		5: defaultGuessInfo,
		6: defaultGuessInfo,
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
	}
}))

export default useGuessesStore;
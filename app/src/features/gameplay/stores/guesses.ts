import {create} from "zustand";
import type {BoardRepresentation} from "@/features/gameplay/types/chess";

type GuessesStore = {
	currentGuess: number;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	guesses: Record<1 | 2 | 3 | 4 | 5 | 6, BoardRepresentation>
}

const useGuessesStore = create<GuessesStore>((set) => ({
	currentGuess: 1,
	moveToPreviousGuess: () => {
		set((state) => {
			if (state.currentGuess > 1) {
				return { currentGuess: state.currentGuess - 1 }
			} else {
				return { currentGuess: state.currentGuess }
			}
		})
	},
	moveToNextGuess: () => {
		set((state) => {
			if (state.currentGuess < 6) {
				return { currentGuess: state.currentGuess + 1 }
			} else {
				return { currentGuess: state.currentGuess }
			}
		})
	},

	guesses: {
		1: {},
		2: {},
		3: {},
		4: {},
		5: {},
		6: {},
	}
}))

export default useGuessesStore;
import {create} from "zustand";
import type {GuessInfo} from "@/features/gameplay/types/guesses";
import {defaultGuessInfo} from "@/features/gameplay/constants/guesses";

type GuessesStore = {
	currentGuess: number;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	guesses: Record<1 | 2 | 3 | 4 | 5 | 6, GuessInfo>
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
		1: defaultGuessInfo,
		2: defaultGuessInfo,
		3: defaultGuessInfo,
		4: defaultGuessInfo,
		5: defaultGuessInfo,
		6: defaultGuessInfo,
	}
}))

export default useGuessesStore;
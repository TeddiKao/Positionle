import {create} from "zustand";

type GuessesStore = {
	currentGuess: number;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;
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
	}
}))

export default useGuessesStore;
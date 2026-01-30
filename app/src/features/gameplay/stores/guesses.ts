import {create} from "zustand";

type GuessesStore = {
	currentGuess: number;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;
}

const useGuessesStore = create<GuessesStore>((set, get) => ({
	currentGuess: 1,
	moveToPreviousGuess: () => {
		if (get().currentGuess > 1) {
			set({ currentGuess: get().currentGuess - 1 });
		}
	},
	moveToNextGuess: () => {
		if (get().currentGuess < 6) {
			set({ currentGuess: get().currentGuess + 1 });
		}
	}
}))

export default useGuessesStore;
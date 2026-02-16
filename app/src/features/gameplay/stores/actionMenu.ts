import { create } from "zustand";
import type { GuessNumbers } from "@/features/gameplay/types/guesses";
import useGuessInfoStore from "@/features/gameplay/stores/guessInfo";

type ActionMenuStore = {
	clearGuess: (guessNumber: GuessNumbers) => void;
	flipBoard: (guessNumber: GuessNumbers) => void;

	showExactDistances: (guessNumber: GuessNumbers) => void;
	hideExactDistances: (guessNumber: GuessNumbers) => void;

	isEraserModeActive: boolean;
	activateEraserMode: () => void;
	deactivateEraserMode: () => void;

	isPenActive: boolean;
	activatePen: () => void;
	deactivatePen: () => void;
};

const useActionMenuStore = create<ActionMenuStore>((set) => ({
	clearGuess: (guessNumber: GuessNumbers) => {
		useGuessInfoStore.getState().updateBoardForGuess(guessNumber, {});
	},

	flipBoard: (guessNumber) => {
		const currentOrientation =
			useGuessInfoStore.getState().guesses[guessNumber].orientation;

		useGuessInfoStore
			.getState()
			.updateOrientationForGuess(
				guessNumber,
				currentOrientation === "white" ? "black" : "white",
			);
	},

	showExactDistances: (guessNumber) => {
		useGuessInfoStore.getState().showExactDistancesForGuess(guessNumber);
	},

	hideExactDistances: (guessNumber: GuessNumbers) => {
		useGuessInfoStore.getState().hideExactDistancesForGuess(guessNumber);
	},

	isEraserModeActive: false,
	activateEraserMode: () => set({ isEraserModeActive: true }),
	deactivateEraserMode: () => set({ isEraserModeActive: false }),

	isPenActive: false,
	activatePen: () => set({ isPenActive: true }),
	deactivatePen: () => set({ isPenActive: false }),
}));

export default useActionMenuStore;

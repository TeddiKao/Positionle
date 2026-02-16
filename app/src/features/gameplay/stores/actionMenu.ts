import { create } from "zustand";
import type { GuessNumbers } from "@/features/gameplay/types/guesses";

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

});

export default useActionMenuStore;

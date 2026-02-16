import type {
	GuessInfo,
	GuessNumbers,
} from "@/features/gameplay/types/guesses";
import { create } from "zustand";

type GuessInfoStore = {
	guesses: Record<GuessNumbers, GuessInfo>;

	updateAnnotationsForGuess: (guess: GuessNumbers) => void;

	showExactDistancesForGuess: (guess: GuessNumbers) => void;
	hideExactDistancesForGuess: (guess: GuessNumbers) => void;

	updateOrientationForGuess: (guess: GuessNumbers) => void;
};

const useGuessInfoStore = create((set) => ({}));

export default useGuessInfoStore;

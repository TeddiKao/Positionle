import type { CanvasPath } from "react-sketch-canvas";
import { create } from "zustand";
import type { GuessNumbers } from "@/features/gameplay/types/guesses";
import useGuessInfoStore from "@/features/gameplay/stores/guessInfo";

type AnnotationToolbarStore = {
	isAnnotationEraserActive: boolean;
	activateAnnotationEraser: () => void;
	deactivateAnnotationEraser: () => void;

	updateAnnotationsForGuess: (
		guessNumber: GuessNumbers,
		annotations: CanvasPath[],
	) => void;

	resetAnnotationToolbarState: () => void;
};

const useAnnotationToolbarStore = create<AnnotationToolbarStore>(
	(set, _get, store) => ({
		isAnnotationEraserActive: false,
		activateAnnotationEraser: () => set({ isAnnotationEraserActive: true }),
		deactivateAnnotationEraser: () =>
			set({ isAnnotationEraserActive: false }),

		updateAnnotationsForGuess: (
			guessNumber: GuessNumbers,
			annotations: CanvasPath[],
		) => {
			useGuessInfoStore
				.getState()
				.updateAnnotationsForGuess(guessNumber, annotations);
		},

		resetAnnotationToolbarState: () => {
			set(store.getInitialState());
		},
	}),
);

export default useAnnotationToolbarStore;

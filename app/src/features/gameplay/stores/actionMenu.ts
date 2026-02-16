import { create } from "zustand";

type ActionMenuStore = {
	clearGuess: () => void;
	flipBoard: () => void;

	showExactDistances: () => void;
	hideExactDistances: () => void;

	activateEraserMode: () => void;
	deactivateEraserMode: () => void;

	activatePen: () => void;
	deactivatePen: () => void;
};

const useActionMenuStore = create((set) => {});

export default useActionMenuStore;

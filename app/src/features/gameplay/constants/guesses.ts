import type { GuessInfo } from "@/features/gameplay/types/guesses";

const defaultGuessInfo: GuessInfo = {
	guess: {},
	isSubmitted: false,
	guessResult: null,
	orientation: "white",
	isShowingExactDistances: false,
	isEraserModeActive: false,
	penActive: false,
};

export { defaultGuessInfo };

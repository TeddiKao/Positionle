import type { GuessInfo } from "@/features/gameplay/types/guesses";

const defaultGuessInfo: GuessInfo = {
	guess: {},
	isSubmitted: false,
	guessResult: null,

	orientation: "white",
	isShowingExactDistances: false,

	annotations: [],
};

export { defaultGuessInfo };

import type {
	CorrectPositionInfo,
	GuessNumbers,
} from "@/features/gameplay/types/guesses";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import type {
	BoardRepresentation,
	SquareInfo,
} from "@/features/gameplay/types/chess";
import { create } from "zustand";
import { checkAnswer } from "@/features/gameplay/utils/answerCheck";
import _ from "lodash";
import useGuessInfoStore from "@/features/gameplay/stores/guessInfo";

type GameStateStore = {
	currentGuess: GuessNumbers;
	moveToPreviousGuess: () => void;
	moveToNextGuess: () => void;

	usedGuesses: 0 | GuessNumbers;
	increaseUsedGuesses: () => void;
	resetUsedGuesses: () => void;

	correctPositionInfo: CorrectPositionInfo | null;
	updateCorrectPositionInfo: (position: CorrectPositionInfo) => void;
	clearCorrectPosition: () => void;

	hasCorrectlyGuessed: boolean;
	markAsCorrectlyGuessed: () => void;

	addToBoardOfCurrentGuess: (
		square: SquareCoordinate,
		pieceInfo: SquareInfo,
	) => void;
	removeFromBoardOfCurrentGuess: (square: SquareCoordinate) => void;
	movePieceOnBoardOfCurrentGuess: (
		from: SquareCoordinate,
		to: SquareCoordinate,
	) => void;

	updatePositionOfCurrentGuess: (position: BoardRepresentation) => void;

	submitCurrentGuess: () => void;
	resetGameState: () => void;
};

const useGameStateStore = create<GameStateStore>((set, get, store) => ({
	currentGuess: 1,
	moveToPreviousGuess: () => {
		set((state) => {
			if (state.currentGuess > 1) {
				return {
					currentGuess: (state.currentGuess - 1) as GuessNumbers,
				};
			} else {
				return { currentGuess: state.currentGuess };
			}
		});
	},
	moveToNextGuess: () => {
		set((state) => {
			if (state.currentGuess < 6) {
				return {
					currentGuess: (state.currentGuess + 1) as GuessNumbers,
				};
			} else {
				return { currentGuess: state.currentGuess };
			}
		});
	},

	usedGuesses: 0,
	increaseUsedGuesses: () => {
		set((state) => {
			if (state.usedGuesses < 6) {
				return { usedGuesses: (state.usedGuesses + 1) as GuessNumbers };
			} else {
				return { usedGuesses: state.usedGuesses };
			}
		});
	},
	resetUsedGuesses: () => {
		set({ usedGuesses: 0 });
	},

	correctPositionInfo: null,
	updateCorrectPositionInfo: (positionInfo: CorrectPositionInfo) => {
		set({ correctPositionInfo: positionInfo });
	},
	clearCorrectPosition: () => {
		set({ correctPositionInfo: null });
	},

	hasCorrectlyGuessed: false,
	markAsCorrectlyGuessed: () => {
		set({ hasCorrectlyGuessed: true });
	},

	addToBoardOfCurrentGuess: (square, pieceInfo) => {
		const currentGuessInfo =
			useGuessInfoStore.getState().guesses[get().currentGuess];

		const updatedBoard = structuredClone(currentGuessInfo.guess);
		updatedBoard[square] = pieceInfo;

		useGuessInfoStore
			.getState()
			.updateBoardForGuess(get().currentGuess, updatedBoard);
	},

	removeFromBoardOfCurrentGuess: (square) => {
		const currentGuessInfo =
			useGuessInfoStore.getState().guesses[get().currentGuess];
		const updatedBoard = structuredClone(currentGuessInfo.guess);

		delete updatedBoard[square];

		useGuessInfoStore
			.getState()
			.updateBoardForGuess(get().currentGuess, updatedBoard);
	},

	movePieceOnBoardOfCurrentGuess: (from, to) => {
		if (from === to) return {};

		const currentGuessInfo =
			useGuessInfoStore.getState().guesses[get().currentGuess];

		const updatedBoard = structuredClone(currentGuessInfo.guess);
		const squareInfo = updatedBoard[from];
		if (!squareInfo) return {};

		delete updatedBoard[from];
		updatedBoard[to] = squareInfo;

		useGuessInfoStore
			.getState()
			.updateBoardForGuess(get().currentGuess, updatedBoard);
	},

	submitCurrentGuess: () => {
		const state = get();
		if (!state.correctPositionInfo) return;

		const currentGuess = state.currentGuess;
		const currentGuessInfo =
			useGuessInfoStore.getState().guesses[currentGuess];
		if (currentGuessInfo.isSubmitted) return;

		const submission = currentGuessInfo.guess;
		if (!submission) return {};

		const guessResult = checkAnswer(
			state.correctPositionInfo?.correctPosition,
			submission,
		);

		const hasCorrectlyGuessed = _.isEqual(
			state.correctPositionInfo.correctPosition,
			currentGuessInfo.guess,
		);

		useGuessInfoStore.getState().markGuessAsSubmitted(state.currentGuess);
		useGuessInfoStore
			.getState()
			.updateGuessResult(currentGuess, guessResult);

		set({
			usedGuesses:
				state.usedGuesses < 6
					? ((state.usedGuesses + 1) as GuessNumbers)
					: state.usedGuesses,

			hasCorrectlyGuessed: hasCorrectlyGuessed,
		});
	},

	updatePositionOfCurrentGuess: (position: BoardRepresentation) => {
		useGuessInfoStore
			.getState()
			.updateBoardForGuess(get().currentGuess, position);
	},

	resetGameState: () => {
		set(store.getInitialState());
	},
}));

export default useGameStateStore;

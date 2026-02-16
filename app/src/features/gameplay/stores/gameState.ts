import type {
	CorrectPositionInfo,
	GuessInfo,
	GuessNumbers,
} from "@/features/gameplay/types/guesses";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import type { SquareInfo } from "@/features/gameplay/types/chess";
import { create } from "zustand";

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

	guesses: Record<GuessNumbers, GuessInfo>;

	addToBoard: (square: SquareCoordinate, pieceInfo: SquareInfo) => void;
	removeFromBoard: (square: SquareCoordinate) => void;
	movePieceOnBoard: (from: SquareCoordinate, to: SquareCoordinate) => void;

	submitGuess: () => void;
};

const useGameStateStore = create<GameStateStore>(() => {});

export default useGameStateStore;

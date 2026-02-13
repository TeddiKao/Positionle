import type {
	BoardRepresentation,
	PieceColor,
} from "@/features/gameplay/types/chess";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";

type GuessNumbers = 1 | 2 | 3 | 4 | 5 | 6;

type SquareResult = {
	resultType: "correct" | "wrongPosition" | "notInGame";
	taxiDistance: number | null;
};

type GuessResult = Partial<Record<SquareCoordinate, SquareResult>>;

type GuessInfo = {
	guess: BoardRepresentation;
	isSubmitted: boolean;
	guessResult: GuessResult | null;
	orientation: PieceColor;
	isShowingExactDistances: boolean;
	isEraserModeActive: boolean;
	penActive: boolean;
};

type CorrectPositionInfo = {
	correctPosition: BoardRepresentation;
	source: string;
	whitePlayer: string | "NN";
	blackPlayer: string | "NN";
	caption: string;
};

export type { GuessInfo, GuessNumbers, GuessResult, CorrectPositionInfo };

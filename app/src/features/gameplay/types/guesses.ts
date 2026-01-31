import type {BoardRepresentation} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type GuessNumbers = 1 | 2 | 3 | 4 | 5 | 6;

type SquareResult = {
	resultType: "correct" | "wrongPosition" | "notInGame",
	taxiDistance: number | null
}

type GuessResults= Partial<Record<SquareCoordinate, SquareResult>>

type GuessInfo = {
	guess: BoardRepresentation;
	isSubmitted: boolean;
	guessResult: GuessResults | null
}

export type { GuessInfo, GuessNumbers };
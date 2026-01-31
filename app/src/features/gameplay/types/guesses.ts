import type {BoardRepresentation} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

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

export type { GuessInfo };
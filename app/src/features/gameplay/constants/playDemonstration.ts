import type { BoardRepresentation } from "@/features/gameplay/types/chess";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";

const correctPositionDemonstration: BoardRepresentation = {
	e4: { piece: "pawn", color: "white" }
}

const correctPositionColorClasses: Partial<Record<SquareCoordinate, string>> = {
	e4: "bg-green-600",
};

export { correctPositionDemonstration, correctPositionColorClasses };
import type { BoardRepresentation } from "@/features/gameplay/types/chess";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";

const correctPositionDemonstration: BoardRepresentation = {
	e4: { piece: "pawn", color: "white" },
};

const correctPositionColorClasses: Partial<Record<SquareCoordinate, string>> = {
	e4: "bg-green-600",
};

const notInGameDemonstration: BoardRepresentation = {
	d4: { piece: "knight", color: "white" },
};

const notInGameColorClasses: Partial<Record<SquareCoordinate, string>> = {
	d4: "bg-gray-700",
};

const wrongLocationDemonstration: BoardRepresentation = {
	a2: { piece: "pawn", color: "white" },
};

const wrongLocationColorClasses: Partial<Record<SquareCoordinate, string>> = {
	a2: "bg-yellow-500",
};

const wrongLocationDistances: Partial<Record<SquareCoordinate, number>> = {
	a2: 6,
};

export {
	correctPositionDemonstration,
	correctPositionColorClasses,
	notInGameDemonstration,
	notInGameColorClasses,
	wrongLocationDemonstration,
	wrongLocationColorClasses,
	wrongLocationDistances,
};

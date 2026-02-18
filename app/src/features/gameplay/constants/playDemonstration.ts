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

const multiPieceDemonstration: BoardRepresentation = {
	d4: { piece: "pawn", color: "white" },
	a7: { piece: "pawn", color: "white" },
};

const multiPieceColorClasses: Partial<Record<SquareCoordinate, string>> = {
	d4: "bg-lime-500",
	a7: "bg-gray-600",
};

const multiPieceDistances: Partial<Record<SquareCoordinate, number>> = {
	d4: 1,
};

export {
	correctPositionDemonstration,
	correctPositionColorClasses,
	notInGameDemonstration,
	notInGameColorClasses,
	wrongLocationDemonstration,
	wrongLocationColorClasses,
	wrongLocationDistances,
	multiPieceDemonstration,
	multiPieceColorClasses,
	multiPieceDistances,
};

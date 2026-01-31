import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type PieceColor = "white" | "black";
type ChessPieces = "queen" | "rook" | "knight" | "bishop" | "pawn";

type SquareInfo = {
	color: PieceColor;
	pieces: ChessPieces;
}

type BoardRepresentation = Partial<Record<SquareCoordinate, SquareInfo>>

export type { PieceColor, ChessPieces, BoardRepresentation, SquareInfo }
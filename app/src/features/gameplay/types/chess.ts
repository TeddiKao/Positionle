import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type PieceColor = "white" | "black";
type ChessPiece = "queen" | "rook" | "knight" | "bishop" | "pawn";

type SquareInfo = {
	color: PieceColor;
	piece: ChessPiece;
}

type BoardRepresentation = Partial<Record<SquareCoordinate, SquareInfo>>

export type { PieceColor, ChessPiece, BoardRepresentation, SquareInfo }
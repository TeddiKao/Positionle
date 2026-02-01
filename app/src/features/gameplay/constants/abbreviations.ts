import type {ChessPiece, PieceColor} from "@/features/gameplay/types/chess";
import type {ColorAbbreviation, PieceNameAbbreviation} from "@/features/gameplay/types/abbreviations";

type ColorToAbbreviation = Record<PieceColor, ColorAbbreviation>
type PieceToAbbreviation = Record<ChessPiece, PieceNameAbbreviation>;
type AbbreviationToColor = Record<ColorAbbreviation, PieceColor>;
type AbbreviationToPiece = Record<PieceNameAbbreviation, ChessPiece>;

const colorAbbreviations: ColorToAbbreviation = {
	white: "w",
	black: "b",
}

const pieceAbbreviations: PieceToAbbreviation = {
	king: "K",
	queen: "Q",
	rook: "R",
	knight: "N",
	bishop: "B",
	pawn: "P"
}

const abbreviationsToPieces: AbbreviationToPiece = {
	K: "king",
	Q: "queen",
	R: "rook",
	N: "knight",
	B: "bishop",
	P: "pawn"
}

const abbreviationsToColors: AbbreviationToColor = {
	w: "white",
	b: "black"
}

export { colorAbbreviations, pieceAbbreviations, abbreviationsToColors, abbreviationsToPieces }
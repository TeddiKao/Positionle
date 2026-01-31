import type {ChessPiece, PieceColor, SquareInfo as PieceInfo} from "@/features/gameplay/types/chess";
import type {
	ColorAbbreviation, PieceAbbreviation,
	PieceNameAbbreviation
} from "@/features/gameplay/types/abbreviations";
import {abbreviationsToColors, abbreviationsToPieces} from "@/features/gameplay/constants/abbreviations";

function getPieceColorFromAbbreviation(abbreviation: ColorAbbreviation): PieceColor {
	return abbreviationsToColors[abbreviation];
}

function getPieceTypeFromAbbreviation(abbreviation: PieceNameAbbreviation): ChessPiece {
	return abbreviationsToPieces[abbreviation];
}

function getPieceInfoFromAbbreviation(abbreviation: PieceAbbreviation): PieceInfo {
	const colorAbbreviation = abbreviation.split("")[0] as ColorAbbreviation;
	const pieceAbbreviation = abbreviation.split("")[1] as PieceNameAbbreviation;

	const color = getPieceColorFromAbbreviation(colorAbbreviation);
	const piece = getPieceTypeFromAbbreviation(pieceAbbreviation);

	return { color, piece }
};

export { getPieceInfoFromAbbreviation }
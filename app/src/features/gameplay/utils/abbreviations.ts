import type {ChessPiece, PieceColor, SquareInfo as PieceInfo} from "@/features/gameplay/types/chess";
import type {
	ColorAbbreviation, PieceAbbreviation,
	PieceNameAbbreviation
} from "@/features/gameplay/types/abbreviations";
import {abbreviationsToColors, abbreviationsToPieces, colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbreviations";

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
}

function getAbbreviationFromPieceInfo(pieceInfo: PieceInfo): PieceAbbreviation {
	const color = pieceInfo.color;
	const piece = pieceInfo.piece;

	const colorAbbreviation = colorAbbreviations[color];
	const pieceAbbreviation = pieceAbbreviations[piece];

	return `${colorAbbreviation}${pieceAbbreviation}`
}

export { getPieceInfoFromAbbreviation, getAbbreviationFromPieceInfo }
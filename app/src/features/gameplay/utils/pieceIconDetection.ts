import {colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbrieviations";
import {pieceIcons} from "@/features/gameplay/constants/pieceIcons";

function getPieceIcon(color: "white" | "black", piece: "queen" | "rook" | "knight" | "bishop" | "king" | "pawn") {
	const pieceAbbreviation = pieceAbbreviations[piece];
	const colorAbbreviation = colorAbbreviations[color];

	const iconName: "bK" | "bN" | "bB" | "bR" | "bQ" | "bP" | "wK" | "wN" | "wB" | "wR" | "wQ" | "wP" = `${colorAbbreviation}${pieceAbbreviation}`;

	return pieceIcons[iconName];
}

export { getPieceIcon };
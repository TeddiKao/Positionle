import {colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbreviations";
import {whitePieceIcons, blackPieceIcons} from "@/features/gameplay/constants/pieceIcons";

function getPieceIcon(color: "white" | "black", piece: "queen" | "rook" | "knight" | "bishop" | "king" | "pawn") {
	const pieceAbbreviation = pieceAbbreviations[piece];
	const colorAbbreviation = colorAbbreviations[color];

	if (colorAbbreviation === "w") {
		return whitePieceIcons[`${colorAbbreviation}${pieceAbbreviation}` as keyof typeof whitePieceIcons];
	} else {
		return blackPieceIcons[`${colorAbbreviation}${pieceAbbreviation}` as keyof typeof blackPieceIcons];
	}
}

export { getPieceIcon };
import {colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbrieviations";
import {whitePieceIcons, blackPieceIcons} from "@/features/gameplay/constants/pieceIcons";

function getPieceIcon(color: "white" | "black", piece: "queen" | "rook" | "knight" | "bishop" | "king" | "pawn") {
	const pieceAbbreviation = pieceAbbreviations[piece];
	const colorAbbreviation = colorAbbreviations[color];

	if (colorAbbreviation === "w") {
		return whitePieceIcons[`${colorAbbreviation}${pieceAbbreviation}`];
	} else {
		return blackPieceIcons[`${colorAbbreviation}${pieceAbbreviation}`];
	}
}

export { getPieceIcon };

// squareFile is a letter from a-h
import type {PieceColor} from "@/features/gameplay/types/chess";

function isSquareOnLeftEdge(squareFile: string, orientation: PieceColor) {
	if (orientation === "white") {
		return squareFile === "a";
	} else {
		return squareFile === "h";
	}
}

// squareRank is a number from 1-8
function isSquareOnBottomEdge(squareRank: number, orientation: PieceColor) {
	if (orientation === "white") {
		return squareRank === 1;
	} else {
		return squareRank === 8;
	}
}

export { isSquareOnLeftEdge, isSquareOnBottomEdge }
// Fen only includes position, no other data like castling rights etc
import type {
	BoardRepresentation,
	ChessPiece,
	PieceColor,
} from "@/features/gameplay/types/chess";
import { isCharDigit, isUpperCase } from "@/features/gameplay/utils/regex";
import { abbreviationsToPieces } from "@/features/gameplay/constants/abbreviations";
import type { PieceNameAbbreviation } from "@/features/gameplay/types/abbreviations";
import { files } from "@/features/gameplay/constants/coordinates";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import { positions } from "@/positions/positions";

function convertFenToBoardRepresentation(fen: string): BoardRepresentation {
	const board: BoardRepresentation = {};

	let currentFileIndex = 0;
	let currentRank = 8;

	for (const char of fen) {
		if (currentRank === 1 && currentFileIndex > 7) {
			break;
		}

		if (isCharDigit(char)) {
			currentFileIndex += Number(char);
			continue;
		}

		if (char === "/") {
			currentRank--;
			currentFileIndex = 0;

			continue;
		}

		const color: PieceColor = isUpperCase(char) ? "white" : "black";
		const piece: ChessPiece =
			abbreviationsToPieces[char.toUpperCase() as PieceNameAbbreviation];

		const fileCoordinate = files[currentFileIndex];
		const rankCoordinate = currentRank;

		board[`${fileCoordinate}${rankCoordinate}` as SquareCoordinate] = {
			color,
			piece,
		};

		currentFileIndex++;
	}

	return board;
}

function randomlySelectPosition(): BoardRepresentation {
	if (positions.length === 0) {
		throw new Error("No positions available");
	}

	const randomIndex = Math.floor(Math.random() * positions.length);

	return convertFenToBoardRepresentation(positions[randomIndex].positionFen);
}

export { randomlySelectPosition };

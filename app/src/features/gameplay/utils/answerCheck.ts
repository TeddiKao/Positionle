import type {BoardRepresentation} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import type {GuessResult} from "@/features/gameplay/types/guesses";
import type {PieceAbbreviation} from "@/features/gameplay/types/abbreviations";
import {colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbreviations";
import {pieceCounts} from "@/features/gameplay/constants/answerCheck";

function getPieceCounts(position: BoardRepresentation) {
	const positionPieceCounts = structuredClone(pieceCounts);

	Object.entries(position).forEach(([, squareInfo]) => {
		const color = squareInfo.color;
		const piece = squareInfo.piece;

		const abbreviation = `${colorAbbreviations[color]}${pieceAbbreviations[piece]}`;

		positionPieceCounts[abbreviation as PieceAbbreviation] += 1;
	});

	return positionPieceCounts;
}

function detectCorrectPlacements(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation, guessResult: GuessResult) {
	Object.entries(submittedPosition).forEach(([squareCoordinate, submittedSquareInfo]) => {
		const correctSquareInfo = correctPosition[squareCoordinate as SquareCoordinate];
		if (!correctSquareInfo) return;

		if (correctSquareInfo.color !== submittedSquareInfo.color) return;
		if (correctSquareInfo.piece !== submittedSquareInfo.piece) return;

		guessResult[squareCoordinate as SquareCoordinate] = {
			resultType: "correct",
			taxiDistance: null
		}
	})

}

function detectPlacementsNotInGame(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation, guessResult: GuessResult) {
	const correctPositionPieceCounts = getPieceCounts(correctPosition);
	const submittedPositionPieceCounts = structuredClone(pieceCounts);

	console.log(correctPositionPieceCounts);

	Object.entries(submittedPosition).forEach(([squareCoordinate, submittedSquareInfo]) => {
		const submittedPiece = submittedSquareInfo.piece;
		const submittedPieceColor = submittedSquareInfo.color;

		const abbreviation = `${colorAbbreviations[submittedPieceColor]}${pieceAbbreviations[submittedPiece]}`;

		console.log(correctPositionPieceCounts[abbreviation as PieceAbbreviation]);
		console.log(submittedPositionPieceCounts[abbreviation as PieceAbbreviation]);

		if (correctPositionPieceCounts[abbreviation as PieceAbbreviation] <= submittedPositionPieceCounts[abbreviation as PieceAbbreviation]) {
			guessResult[squareCoordinate as SquareCoordinate] = {
				resultType: "notInGame",
				taxiDistance: null
			}
		}
	})
}

function checkAnswer(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation) {
	const guessResult: GuessResult = {}

	detectCorrectPlacements(correctPosition, submittedPosition, guessResult);
	detectPlacementsNotInGame(correctPosition, submittedPosition, guessResult);

	return guessResult;
}

export { checkAnswer };
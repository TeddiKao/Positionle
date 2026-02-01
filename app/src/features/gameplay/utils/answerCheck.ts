import type {BoardRepresentation} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import type {GuessResult} from "@/features/gameplay/types/guesses";
import type {PieceAbbreviation} from "@/features/gameplay/types/abbreviations";
import {colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbreviations";
import {pieceCounts} from "@/features/gameplay/constants/answerCheck";
import {getAbbreviationFromPieceInfo, getPieceInfoFromAbbreviation} from "@/features/gameplay/utils/abbreviations";
import {calculateTaxiDistance} from "@/features/gameplay/utils/distanceCalculation";

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

function getDistancesOfCoordinateFromCoordinates(coordinate: SquareCoordinate, coordinates: SquareCoordinate[]) {
	const distances: Partial<Record<SquareCoordinate, number>> = {};

	coordinates.forEach((coordinateToCompare) => {
		distances[coordinateToCompare] = calculateTaxiDistance(coordinate, coordinateToCompare);
	})

	const distanceEntries = Object.entries(distances);
	distanceEntries.sort(([, aDistance], [, bDistance]) => {
		if (aDistance < bDistance) {
			return -1
		} else if (bDistance > aDistance) {
			return 1;
		} else {
			return 0;
		}
	})

	console.log(distanceEntries);

	return Object.fromEntries(distanceEntries);
}

function getAllPiecesInPosition(position: BoardRepresentation, pieceAbbreviation: PieceAbbreviation) {
	const detectedPieces: BoardRepresentation = {}
	const pieceInfo = getPieceInfoFromAbbreviation(pieceAbbreviation);

	Object.entries(position).forEach(([squareCoordinate, squareInfo]) => {
		const color = squareInfo.color;
		const piece = squareInfo.piece;

		if (pieceInfo.color !== color) return;
		if (pieceInfo.piece !== piece) return;

		detectedPieces[squareCoordinate as SquareCoordinate] = pieceInfo;
	});

	return detectedPieces;
}

function markSquareAsNotInGame(squareCoordinate: SquareCoordinate, guessResult: GuessResult) {
	guessResult[squareCoordinate as SquareCoordinate] = {
		resultType: "notInGame",
		taxiDistance: null
	}
}

function markSquareAsWrongPosition(squareCoordinate: SquareCoordinate, distance: number, guessResult: GuessResult) {
	guessResult[squareCoordinate as SquareCoordinate] = {
		resultType: "wrongPosition",
		taxiDistance: distance
	}
}

function detectCorrectPlacements(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation, guessResult: GuessResult) {
	const correctPlacements: BoardRepresentation = {}

	Object.entries(submittedPosition).forEach(([squareCoordinate, submittedSquareInfo]) => {
		const correctSquareInfo = correctPosition[squareCoordinate as SquareCoordinate];
		if (!correctSquareInfo) return;

		if (correctSquareInfo.color !== submittedSquareInfo.color) return;
		if (correctSquareInfo.piece !== submittedSquareInfo.piece) return;

		guessResult[squareCoordinate as SquareCoordinate] = {
			resultType: "correct",
			taxiDistance: null
		}

		correctPlacements[squareCoordinate as SquareCoordinate] = submittedSquareInfo;
	})


	return correctPlacements;
}

function detectIncorrectPlacements(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation, correctPieces: BoardRepresentation, guessResult: GuessResult) {
	const correctPositionPieceCounts = getPieceCounts(correctPosition);
	const submittedPositionPieceCounts = structuredClone(pieceCounts);

	Object.entries(correctPieces).forEach(([, correctSquareInfo]) => {
		const abbreviation = getAbbreviationFromPieceInfo(correctSquareInfo);
		submittedPositionPieceCounts[abbreviation as PieceAbbreviation] += 1;
	})

	Object.entries(submittedPosition).forEach(([squareCoordinate, submittedSquareInfo]) => {
		if (Object.keys(correctPieces).includes(squareCoordinate)) return;

		const abbreviation = getAbbreviationFromPieceInfo(submittedSquareInfo);

		if (correctPositionPieceCounts[abbreviation as PieceAbbreviation] <= submittedPositionPieceCounts[abbreviation as PieceAbbreviation]) {
			markSquareAsNotInGame(squareCoordinate as SquareCoordinate, guessResult);
			return;
		}

		// Represents all pieces of the current type in the position the user should guess
		const allPiecesInCorrectPosition = getAllPiecesInPosition(correctPosition, abbreviation);
		const sortedDistances = getDistancesOfCoordinateFromCoordinates(squareCoordinate as SquareCoordinate, Object.keys(allPiecesInCorrectPosition) as SquareCoordinate[]);
		const closestDistance = Object.values(sortedDistances)[0];

		markSquareAsWrongPosition(squareCoordinate as SquareCoordinate, closestDistance, guessResult);
		submittedPositionPieceCounts[abbreviation as PieceAbbreviation] += 1;
	})
}

function checkAnswer(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation) {
	const guessResult: GuessResult = {}

	const correctPlacements = detectCorrectPlacements(correctPosition, submittedPosition, guessResult);
	detectIncorrectPlacements(correctPosition, submittedPosition, correctPlacements, guessResult);

	return guessResult;
}

export { checkAnswer };
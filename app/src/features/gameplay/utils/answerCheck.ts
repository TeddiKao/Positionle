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

function sortPieceDistances(pieceDistances: Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", number>>>>) {
	Object.entries(pieceDistances).forEach(([coordinateToGuess, guessedPieceDistances]) => {
		const distanceEntries = Object.entries(guessedPieceDistances)

		distanceEntries.sort(([, aDistance], [, bDistance]) => {
			if (aDistance < bDistance) {
				return -1
			} else if (aDistance > bDistance) {
				return 1;
			} else {
				return 0;
			}
		});

		pieceDistances[coordinateToGuess as SquareCoordinate] = Object.fromEntries(distanceEntries);
	});
}

function selectClosestPiecesToDisplayAsWrongLocation(pieceDistances: Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", number>>>>, guessResult: GuessResult) {
	Object.entries(pieceDistances).forEach(([, guessedPieceDistances]) => {
		const closestCoordinate = Object.keys(guessedPieceDistances)[0];
		const closestDistance = guessedPieceDistances[closestCoordinate as SquareCoordinate];
		if (!closestDistance) return;

		markSquareAsWrongPosition(closestCoordinate as SquareCoordinate, closestDistance, guessResult);

		Object.entries(pieceDistances).forEach(([, otherGuessedPieceDistances]) => {
			delete otherGuessedPieceDistances[closestCoordinate as SquareCoordinate];
		})
	});
}

function markLeftoverSquaresAsNotInGame(pieceDistances: Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", number>>>>, guessResult: GuessResult) {
	Object.entries(pieceDistances).forEach(([, leftoverDistances]) => {
		Object.keys(leftoverDistances).forEach((leftoverSquareCoordinate) => {
			markSquareAsNotInGame(leftoverSquareCoordinate as SquareCoordinate, guessResult);
		})
	})
}

function constructPieceDistances(allSubmittedPieces: BoardRepresentation, correctPieces: BoardRepresentation, allPiecesInPositionToGuess: BoardRepresentation, pieceDistances: Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", Partial<Record<"a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8", number>>>>) {
	Object.keys(allSubmittedPieces).forEach((submittedPieceCoordinate) => {
		if (Object.keys(correctPieces).includes(submittedPieceCoordinate)) return;

		Object.keys(allPiecesInPositionToGuess).forEach((pieceToGuessCoordinate) => {
			if (Object.keys(correctPieces).includes(pieceToGuessCoordinate)) return;

			const taxiDistance = calculateTaxiDistance(submittedPieceCoordinate as SquareCoordinate, pieceToGuessCoordinate as SquareCoordinate);
			if (pieceDistances[pieceToGuessCoordinate as SquareCoordinate] === undefined) {
				pieceDistances[pieceToGuessCoordinate as SquareCoordinate] = {};
			}

			pieceDistances[pieceToGuessCoordinate as SquareCoordinate]![submittedPieceCoordinate as SquareCoordinate] = taxiDistance;
		})
	})
}

function detectIncorrectPlacements(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation, correctPieces: BoardRepresentation, guessResult: GuessResult) {
	const correctPositionPieceCounts = getPieceCounts(correctPosition);
	const submittedPositionPieceCounts = structuredClone(pieceCounts);

	Object.entries(correctPieces).forEach(([, correctSquareInfo]) => {
		const abbreviation = getAbbreviationFromPieceInfo(correctSquareInfo);
		submittedPositionPieceCounts[abbreviation as PieceAbbreviation] += 1;
	})

	const pieceDistances: Partial<Record<SquareCoordinate, Partial<Record<SquareCoordinate, number>>>> = {};

	Object.entries(submittedPosition).forEach(([squareCoordinate, submittedSquareInfo]) => {
		if (Object.keys(correctPieces).includes(squareCoordinate)) return;

		const abbreviation = getAbbreviationFromPieceInfo(submittedSquareInfo);

		if (correctPositionPieceCounts[abbreviation as PieceAbbreviation] === 0) {
			markSquareAsNotInGame(squareCoordinate as SquareCoordinate, guessResult);
			return;
		}

		const allSubmittedPieces = getAllPiecesInPosition(submittedPosition, abbreviation);
		const numSubmittedPieces = Object.keys(allSubmittedPieces).length;
		const allPiecesInPositionToGuess = getAllPiecesInPosition(correctPosition, abbreviation);
		const numPiecesInPositionToGuess = Object.keys(allPiecesInPositionToGuess).length;


		if (numSubmittedPieces <= numPiecesInPositionToGuess) {
			const distances = getDistancesOfCoordinateFromCoordinates(squareCoordinate as SquareCoordinate, Object.keys(allPiecesInPositionToGuess) as SquareCoordinate[]);
			const closestDistance = Object.values(distances)[0];

			markSquareAsWrongPosition(squareCoordinate as SquareCoordinate, closestDistance, guessResult);
		} else {
			constructPieceDistances(allSubmittedPieces, correctPieces, allPiecesInPositionToGuess, pieceDistances);
			sortPieceDistances(pieceDistances);
			selectClosestPiecesToDisplayAsWrongLocation(pieceDistances, guessResult);
			markLeftoverSquaresAsNotInGame(pieceDistances, guessResult);
		}
	});
}

function checkAnswer(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation) {
	const guessResult: GuessResult = {}

	const correctPlacements = detectCorrectPlacements(correctPosition, submittedPosition, guessResult);
	detectIncorrectPlacements(correctPosition, submittedPosition, correctPlacements, guessResult);

	return guessResult;
}

export { checkAnswer };
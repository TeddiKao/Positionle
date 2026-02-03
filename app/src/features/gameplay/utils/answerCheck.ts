import type {BoardRepresentation} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import type {GuessResult} from "@/features/gameplay/types/guesses";
import type {PieceAbbreviation} from "@/features/gameplay/types/abbreviations";
import {colorAbbreviations, pieceAbbreviations} from "@/features/gameplay/constants/abbreviations";
import {pieceCounts} from "@/features/gameplay/constants/answerCheck";
import {getAbbreviationFromPieceInfo, getPieceInfoFromAbbreviation} from "@/features/gameplay/utils/abbreviations";
import {calculateTaxiDistance} from "@/features/gameplay/utils/distanceCalculation";

type PieceDistances = Partial<Record<SquareCoordinate, Partial<Record<SquareCoordinate, number>>>>;

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
		} else if (aDistance > bDistance) {
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

function sortPieceDistances(pieceDistances: PieceDistances) {
	console.log("Sorting using", pieceDistances);

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

function selectClosestPiecesToDisplayAsWrongLocation(pieceDistances: PieceDistances, guessResult: GuessResult) {
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

function markLeftoverSquaresAsNotInGame(pieceDistances: PieceDistances, guessResult: GuessResult) {
	Object.entries(pieceDistances).forEach(([, leftoverDistances]) => {
		Object.keys(leftoverDistances).forEach((leftoverSquareCoordinate) => {
			markSquareAsNotInGame(leftoverSquareCoordinate as SquareCoordinate, guessResult);
		})
	})
}

function constructPieceDistances(allSubmittedPieces: BoardRepresentation, correctPieces: BoardRepresentation, allPiecesInPositionToGuess: BoardRepresentation, pieceDistances: PieceDistances) {
	const newPieceDistances = structuredClone(pieceDistances);

	Object.keys(allSubmittedPieces).forEach((submittedPieceCoordinate) => {
		if (Object.keys(correctPieces).includes(submittedPieceCoordinate)) {
			const correctPieceInfo = correctPieces[submittedPieceCoordinate as SquareCoordinate];
			if (!correctPieceInfo) return;

			const submittedPieceInfo = allSubmittedPieces[submittedPieceCoordinate as SquareCoordinate];
			if (!submittedPieceInfo) return;

			if (correctPieceInfo.color === submittedPieceInfo.color && correctPieceInfo.piece === submittedPieceInfo.piece) {
				return;
			}
		}

		Object.keys(allPiecesInPositionToGuess).forEach((pieceToGuessCoordinate) => {
			console.log("Original piece distances", JSON.parse(JSON.stringify(newPieceDistances)))

			if (Object.keys(correctPieces).includes(pieceToGuessCoordinate)) {
				const correctPieceInfo = correctPieces[pieceToGuessCoordinate as SquareCoordinate];
				if (!correctPieceInfo) return;

				const pieceToGuessInfo = allPiecesInPositionToGuess[pieceToGuessCoordinate as SquareCoordinate];
				if (!pieceToGuessInfo) return;

				if (pieceToGuessInfo.color === correctPieceInfo.color && pieceToGuessInfo.piece === correctPieceInfo.piece) {
					return;
				}
			}

			const taxiDistance = calculateTaxiDistance(submittedPieceCoordinate as SquareCoordinate, pieceToGuessCoordinate as SquareCoordinate);
			if (newPieceDistances[pieceToGuessCoordinate as SquareCoordinate] === undefined) {
				newPieceDistances[pieceToGuessCoordinate as SquareCoordinate] = {};
			}

			newPieceDistances[pieceToGuessCoordinate as SquareCoordinate]![submittedPieceCoordinate as SquareCoordinate] = taxiDistance

			console.log("New piece distances", JSON.parse(JSON.stringify(newPieceDistances)));
		})

		console.log("loop ended");
	});

	console.log("Constructed piece distances", newPieceDistances)

	return newPieceDistances;
}

function detectIncorrectPlacements(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation, correctPieces: BoardRepresentation, guessResult: GuessResult) {
	const correctPositionPieceCounts = getPieceCounts(correctPosition);
	const submittedPositionPieceCounts = structuredClone(pieceCounts);

	Object.entries(correctPieces).forEach(([, correctSquareInfo]) => {
		const abbreviation = getAbbreviationFromPieceInfo(correctSquareInfo);
		submittedPositionPieceCounts[abbreviation as PieceAbbreviation] += 1;
	})

	const pieceDistances: PieceDistances = {};

	Object.entries(submittedPosition).forEach(([squareCoordinate, submittedSquareInfo]) => {
		if (Object.keys(correctPieces).includes(squareCoordinate)) return;

		const abbreviation = getAbbreviationFromPieceInfo(submittedSquareInfo);

		if (correctPositionPieceCounts[abbreviation as PieceAbbreviation] === 0) {
			markSquareAsNotInGame(squareCoordinate as SquareCoordinate, guessResult);
			return;
		}

		const allSubmittedPieces = getAllPiecesInPosition(submittedPosition, abbreviation);
		const remainingSubmittedPieces = Object.fromEntries(
			Object.entries(allSubmittedPieces).filter(([coordinate]) => !correctPieces[coordinate as SquareCoordinate])
		)
		const numSubmittedPieces = Object.keys(allSubmittedPieces).length;

		const allPiecesInPositionToGuess = getAllPiecesInPosition(correctPosition, abbreviation);
		const remainingPiecesToGuess = Object.fromEntries(
			Object.entries(allPiecesInPositionToGuess).filter(([coordinate]) => !correctPieces[coordinate as SquareCoordinate])
		)
		const numPiecesInPositionToGuess = Object.keys(allPiecesInPositionToGuess).length;

		if (numSubmittedPieces <= numPiecesInPositionToGuess) {
			const distances = getDistancesOfCoordinateFromCoordinates(squareCoordinate as SquareCoordinate, Object.keys(remainingPiecesToGuess) as SquareCoordinate[]);
			const closestDistance = Object.values(distances)[0];

			markSquareAsWrongPosition(squareCoordinate as SquareCoordinate, closestDistance, guessResult);
		} else {
			const constructedPieceDistances = constructPieceDistances(remainingSubmittedPieces, correctPieces, remainingPiecesToGuess, pieceDistances);
			sortPieceDistances(constructedPieceDistances);
			selectClosestPiecesToDisplayAsWrongLocation(constructedPieceDistances, guessResult);
			markLeftoverSquaresAsNotInGame(constructedPieceDistances, guessResult);
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
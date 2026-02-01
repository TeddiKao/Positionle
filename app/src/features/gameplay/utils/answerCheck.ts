import type {BoardRepresentation} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import type {GuessResult} from "@/features/gameplay/types/guesses";

function checkAnswer(correctPosition: BoardRepresentation, submittedPosition: BoardRepresentation) {
	const guessResult: GuessResult = {}

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

	return guessResult;
}

export { checkAnswer };
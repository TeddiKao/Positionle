import LeftArrow from "@/features/gameplay/icons/guessNavigator/LeftArrow";
import RightArrow from "@/features/gameplay/icons/guessNavigator/RightArrow";
import useGuessesStore from "@/features/gameplay/stores/guesses";

function GuessNavigator() {
	const { currentGuess, moveToPreviousGuess, moveToNextGuess } = useGuessesStore();

	return (
		<div className="flex flex-row items-center gap-2 px-2 py-1 rounded-lg shadow-md bg-gray-50 shadow-gray-400">
			{currentGuess > 1 ? (
				<button onClick={moveToPreviousGuess} aria-label="Previous guess" type="button" className="hover:bg-gray-400 rounded-md">
					<LeftArrow />
				</button>
			) : (
				<button aria-disaled disabled aria-label="Previous guess" type="button" className="opacity-40">
					<LeftArrow />
				</button>
			)}

			<p>Guess {currentGuess} of 6</p>

			{currentGuess < 6 ? (
				<button onClick={moveToNextGuess} aria-label="Next guess" type="button" className="hover:bg-gray-400 rounded-md">
					<RightArrow />
				</button>
			) : (
				<button aria-label="Next guess" type="button" className="opacity-40">
					<RightArrow />
				</button>
			)}
		</div>
	)
}

export default GuessNavigator;
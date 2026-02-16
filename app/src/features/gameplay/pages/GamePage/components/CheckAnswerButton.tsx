import { Button } from "@/components/ui/button";
import useGameStateStore from "@/features/gameplay/stores/gameState";
import useGuessInfoStore from "@/features/gameplay/stores/guessInfo";

function CheckAnswerButton() {
	const { currentGuess, submitCurrentGuess } = useGameStateStore();
	const { guesses } = useGuessInfoStore();

	function handleAnswerSubmission() {
		if (guesses[currentGuess].isSubmitted) {
			return;
		}

		submitCurrentGuess();
	}

	return (
		<Button
			onClick={handleAnswerSubmission}
			type="button"
			className="w-full max-w-md hover:opacity-90"
		>
			Check
		</Button>
	);
}

export default CheckAnswerButton;

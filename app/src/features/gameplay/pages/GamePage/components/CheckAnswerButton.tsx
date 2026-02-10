import { Button } from "@/components/ui/button";
import useGuessesStore from "@/features/gameplay/stores/guesses";

function CheckAnswerButton() {
	const { guesses, currentGuess, submitGuess } = useGuessesStore();

	function handleAnswerSubmission() {
		if (guesses[currentGuess].isSubmitted) {
			return;
		}

		submitGuess();
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

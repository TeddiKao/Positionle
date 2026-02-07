import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	IconEraser,
	IconEye,
	IconEyeOff,
	IconRefresh as IconFlip,
	IconTrash,
} from "@tabler/icons-react";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import { clsx } from "clsx";

function ActionsMenu() {
	const {
		guesses,
		currentGuess,
		clearGuess,
		flipBoard,
		showExactDistances,
		hideExactDistances,
		activateEraserMode,
		deactivateEraserMode,
	} = useGuessesStore();

	const isShowingExactDistances =
		guesses[currentGuess].isShowingExactDistances;
	const isEraserModeActive = guesses[currentGuess].isEraserModeActive;

	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col shadow-gray-400 shadow-md w-max px-1 py-2 gap-2 rounded-md">
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							aria-label="Eraser mode (remove a piece)"
							type="button"
							className={clsx(
								"hover:bg-gray-400 rounded-md p-1",
								isEraserModeActive ? "bg-black" : "",
							)}
							onClick={() => {
								if (isEraserModeActive) {
									deactivateEraserMode();
								} else {
									activateEraserMode();
								}
							}}
						>
							<IconEraser
								className={
									isEraserModeActive ? "stroke-white" : ""
								}
							/>
						</button>
					</TooltipTrigger>

					<TooltipContent side="right">
						Eraser mode (remove a piece)
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<button
							onClick={clearGuess}
							aria-label="Clear board"
							type="button"
							className="hover:bg-gray-400 rounded-md p-1"
						>
							<IconTrash />
						</button>
					</TooltipTrigger>

					<TooltipContent side="right">Clear board</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<button
							onClick={flipBoard}
							aria-label="Flip board"
							type="button"
							className="hover:bg-gray-400 rounded-md p-1"
						>
							<IconFlip />
						</button>
					</TooltipTrigger>

					<TooltipContent side="right">Flip board</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<button
							aria-label={
								isShowingExactDistances
									? "Hide exact distances"
									: "Show exact distances"
							}
							type="button"
							className="hover:bg-gray-400 rounded-md p-1"
							onClick={() =>
								isShowingExactDistances
									? hideExactDistances()
									: showExactDistances()
							}
						>
							{isShowingExactDistances ? (
								<IconEye />
							) : (
								<IconEyeOff />
							)}
						</button>
					</TooltipTrigger>

					<TooltipContent side="right">
						{isShowingExactDistances
							? "Hide exact distances"
							: "Show exact distances"}
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
}

export default ActionsMenu;

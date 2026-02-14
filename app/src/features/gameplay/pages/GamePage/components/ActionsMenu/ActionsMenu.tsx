import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	IconCopy,
	IconEraser,
	IconEye,
	IconEyeOff,
	IconPencil,
	IconRefresh as IconFlip,
	IconTrash,
} from "@tabler/icons-react";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import { clsx } from "clsx";
import type { GuessNumbers } from "@/features/gameplay/types/guesses";
import { AnnotationToolbar } from "@/features/gameplay/pages/GamePage/components/ActionsMenu/components/AnnotationToolbar";

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
		activatePen,
		deactivatePen,
		updatePosition,
	} = useGuessesStore();

	const isShowingExactDistances =
		guesses[currentGuess].isShowingExactDistances;
	const isEraserModeActive = guesses[currentGuess].isEraserModeActive;
	const isPenActive = guesses[currentGuess].isPenActive;

	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col shadow-gray-400 shadow-md w-max px-1 py-2 gap-2 rounded-md">
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							aria-label="Eraser mode (remove a piece)"
							type="button"
							className={clsx(
								" rounded-md p-1",
								isEraserModeActive ? "bg-black" : "",
								isEraserModeActive
									? "hover:bg-gray-700"
									: "hover:bg-gray-400",
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

				{!isPenActive ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								aria-label={
									isPenActive
										? "Deactivate pen"
										: "Activate pen"
								}
								type="button"
								className={clsx(
									" rounded-md p-1",
									isPenActive ? "bg-black" : "",
									isPenActive
										? "hover:bg-gray-700"
										: "hover:bg-gray-400",
								)}
								onClick={() => {
									if (isPenActive) {
										deactivatePen();
									} else {
										activatePen();
									}
								}}
							>
								<IconPencil
									className={
										isPenActive ? "stroke-white" : ""
									}
								/>
							</button>
						</TooltipTrigger>

						<TooltipContent side="right">
							{isPenActive ? "Deactivate pen" : "Activate pen"}
						</TooltipContent>
					</Tooltip>
				) : (
					<AnnotationToolbar />
				)}

				{currentGuess > 1 ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								aria-label="Copy position"
								type="button"
								className="hover:bg-gray-400 rounded-md p-1"
								onClick={() => {
									if (currentGuess - 1 > 0) {
										updatePosition(
											guesses[
												(currentGuess -
													1) as GuessNumbers
											].guess,
										);
									}
								}}
							>
								<IconCopy />
							</button>
						</TooltipTrigger>

						<TooltipContent side="right">
							Copy previous position
						</TooltipContent>
					</Tooltip>
				) : (
					<button
						aria-label="Copy position (disabled)"
						type="button"
						className="rounded-md p-1"
						disabled={true}
						aria-disabled={true}
					>
						<IconCopy className="stroke-gray-400" />
					</button>
				)}
			</div>
		</div>
	);
}

export default ActionsMenu;

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
import AnnotationToolbar from "@/features/gameplay/pages/GamePage/components/ActionsMenu/components/AnnotationToolbar";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import type { RefObject } from "react";
import { captureEvent } from "@/features/gameplay/utils/posthog";

type ActionsMenuProps = {
	canvasRef: RefObject<ReactSketchCanvasRef | null>;
};

function ActionsMenu({ canvasRef }: ActionsMenuProps) {
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
									? "hover:bg-gray-800"
									: "hover:bg-gray-400",
							)}
							onClick={() => {
								if (isEraserModeActive) {
									deactivateEraserMode();
								} else {
									captureEvent("action_button_used", {
										action: "activate_eraser_mode",
									});

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
							onClick={() => {
								clearGuess();
								captureEvent("action_button_used", {
									action: "clear_guess",
								});
							}}
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
							onClick={() => {
								flipBoard();
								captureEvent("action_button_used", {
									action: "flip_board",
								});
							}}
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
							onClick={() => {
								if (isShowingExactDistances) {
									hideExactDistances();
								} else {
									showExactDistances();
								}

								captureEvent("action_button_used", {
									action: "show_exact_distances",
								});
							}}
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
								aria-label="Deactivate pen"
								type="button"
								className="rounded-md p-1 hover:bg-gray-400"
								onClick={() => {
									activatePen();
									captureEvent("action_button_used", {
										action: "activate_pen",
									});
								}}
							>
								<IconPencil />
							</button>
						</TooltipTrigger>

						<TooltipContent side="right">
							Activate pen
						</TooltipContent>
					</Tooltip>
				) : (
					<AnnotationToolbar canvasRef={canvasRef} />
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

										captureEvent("action_button_used", {
											action: "copy_position",
										});
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

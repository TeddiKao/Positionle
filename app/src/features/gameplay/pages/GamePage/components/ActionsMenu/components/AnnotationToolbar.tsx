import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	IconArrowBackUp,
	IconArrowForwardUp,
	IconEraser,
	IconLogout2,
	IconPencil,
} from "@tabler/icons-react";
import useGuessesStore from "@/features/gameplay/stores/guesses";
import { clsx } from "clsx";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import type { RefObject } from "react";

type AnnotationToolbarProps = {
	canvasRef: RefObject<ReactSketchCanvasRef | null>;
};

function AnnotationToolbar({ canvasRef }: AnnotationToolbarProps) {
	const {
		deactivatePen,
		guesses,
		currentGuess,
		activateAnnotationEraser,
		deactivateAnnotationEraser,
	} = useGuessesStore();
	const currentGuessInfo = guesses[currentGuess];
	const isAnnotationEraserActive =
		currentGuessInfo.annotationTools.isEraserActive;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					aria-label="Open pen menu"
					type="button"
					className="rounded-md p-1 bg-black hover:bg-gray-800"
				>
					<IconPencil className="stroke-white" />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className="flex flex-col pl-1 pr-2 py-2 w-max"
				side="right"
				sideOffset={8}
				align="start"
			>
				<button
					type="button"
					onClick={
						isAnnotationEraserActive
							? deactivateAnnotationEraser
							: activateAnnotationEraser
					}
					className={clsx(
						"flex flex-row items-center gap-2 p-1 rounded-md",
						isAnnotationEraserActive ? "bg-black" : "",
						isAnnotationEraserActive
							? "hover:bg-gray-800"
							: "hover:bg-gray-400",
					)}
				>
					<IconEraser
						className={clsx(
							isAnnotationEraserActive ? "stroke-white" : "",
						)}
					/>
					<span
						className={clsx(
							isAnnotationEraserActive ? "text-white" : "",
						)}
					>
						Erase
					</span>
				</button>
				<button
					type="button"
					onClick={() => {
						canvasRef.current?.undo();
					}}
					className="flex flex-row items-center gap-2 p-1 rounded-md hover:bg-gray-400"
				>
					<IconArrowBackUp />
					<span>Undo</span>
				</button>

				<button
					onClick={() => canvasRef.current?.redo()}
					type="button"
					className="flex flex-row items-center gap-2 p-1 rounded-md hover:bg-gray-400"
				>
					<IconArrowForwardUp />
					<span>Redo</span>
				</button>

				<button
					type="button"
					onClick={deactivatePen}
					className="flex flex-row items-center gap-2 p-1 rounded-md hover:bg-red-200"
				>
					<IconLogout2 className="stroke-red-500" />
					<span className="text-red-500">Exit annotation</span>
				</button>
			</PopoverContent>
		</Popover>
	);
}

export default AnnotationToolbar;

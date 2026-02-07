import Eraser from "@/features/gameplay/icons/actionMenu/Eraser";
import TrashCan from "@/features/gameplay/icons/actionMenu/TrashCan";
import Flip from "@/features/gameplay/icons/actionMenu/Flip";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useDistanceDisplayStore } from "@/features/gameplay/stores/distanceDisplay";

function ActionsMenu() {
	const { isShowingExactDistances, showExactDistances, hideExactDistances } =
		useDistanceDisplayStore();

	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col shadow-gray-400 shadow-md w-max px-1 py-2 gap-2 rounded-md">
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							aria-label="Eraser mode (remove a piece)"
							type="button"
							className="hover:bg-gray-400 rounded-md p-1"
						>
							<Eraser />
						</button>
					</TooltipTrigger>

					<TooltipContent side="right">
						Eraser mode (remove a piece)
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<button
							aria-label="Clear board"
							type="button"
							className="hover:bg-gray-400 rounded-md p-1"
						>
							<TrashCan />
						</button>
					</TooltipTrigger>

					<TooltipContent side="right">Clear board</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<button
							aria-label="Flip board"
							type="button"
							className="hover:bg-gray-400 rounded-md p-1"
						>
							<Flip />
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

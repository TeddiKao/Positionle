import Eraser from "@/features/gameplay/icons/actionMenu/Eraser";
import TrashCan from "@/features/gameplay/icons/actionMenu/TrashCan";
import Flip from "@/features/gameplay/icons/actionMenu/Flip";

function ActionsMenu() {
	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col shadow-gray-400 shadow-md w-max px-1 py-2 gap-2 rounded-md">
				<button aria-label="Eraser mode (remove a piece)" type="button" className="hover:bg-gray-400 rounded-md p-1">
					<Eraser />
				</button>

				<button aria-label="Clear board" type="button" className="hover:bg-gray-400 rounded-md p-1">
					<TrashCan />
				</button>

				<button aria-label="Flip board" type="button" className="hover:bg-gray-400 rounded-md p-1">
					<Flip />
				</button>
			</div>
		</div>
	)
}

export default ActionsMenu;
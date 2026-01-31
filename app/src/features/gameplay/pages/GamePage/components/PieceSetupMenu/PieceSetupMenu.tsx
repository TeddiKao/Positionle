import {blackPieceIcons, whitePieceIcons} from "@/features/gameplay/constants/pieceIcons";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";
import PieceForSetup from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu/components/PieceForSetup";

function PieceSetupMenu() {
	function handleDragEnd(event: DragEndEvent) {
		console.log("Drag ended")

		if (event.over) {
			console.log(event.over.id);
		}
	}

	return (
		<div className="flex flex-row justify-end items-center">
			<div className="flex flex-row w-max p-1 rounded-md shadow-md shadow-gray-400">
				<div className="flex flex-col">
					{Object.entries(whitePieceIcons).map(([abbreviation, icon]) => (
						<DndContext key={abbreviation} onDragEnd={handleDragEnd}>
							<PieceForSetup abbreviation={abbreviation} icon={icon} />
						</DndContext>
					))}
				</div>

				<div className="flex flex-col">
					{Object.entries(blackPieceIcons).map(([abbreviation, icon]) => (
						<DndContext key={abbreviation} onDragEnd={handleDragEnd}>
							<PieceForSetup abbreviation={abbreviation} icon={icon} />
						</DndContext>
					))}
			</div>
			</div>
		</div>
	)
}

export default PieceSetupMenu;
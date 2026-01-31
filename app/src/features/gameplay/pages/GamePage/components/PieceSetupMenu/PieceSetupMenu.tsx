import {blackPieceIcons, whitePieceIcons} from "@/features/gameplay/constants/pieceIcons";
import {DndContext} from "@dnd-kit/core";
import PieceForSetup from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu/components/PieceForSetup";

function PieceSetupMenu() {
	return (
		<DndContext>
			<div className="flex flex-row justify-end items-center">
				<div className="flex flex-row w-max p-1 rounded-md shadow-md shadow-gray-400">
					<div className="flex flex-col">
						{Object.entries(whitePieceIcons).map(([abbreviation, icon]) => (
							<PieceForSetup abbreviation={abbreviation} icon={icon} />
						))}
					</div>

					<div className="flex flex-col">
						{Object.entries(blackPieceIcons).map(([abbreviation, icon]) => (
							<PieceForSetup abbreviation={abbreviation} icon={icon} />
						))}
					</div>
				</div>
			</div>
		</DndContext>
	)
}

export default PieceSetupMenu;
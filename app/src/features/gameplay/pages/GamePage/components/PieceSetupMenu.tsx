import {blackPieceIcons, whitePieceIcons} from "@/features/gameplay/constants/pieceIcons";

function PieceSetupMenu() {
	return (
		<div className="flex flex-row justify-end items-center">
			<div className="flex flex-row w-max p-1 rounded-md shadow-md shadow-gray-400">
				<div className="flex flex-col">
					{Object.entries(whitePieceIcons).map(([abbreviation, icon]) => (
						<button key={abbreviation} type="button" className="hover:bg-gray-400 rounded-md">
							<img className="w-12 h-12" src={icon} alt={abbreviation} />
						</button>
					))}
				</div>

				<div className="flex flex-col">
					{Object.entries(blackPieceIcons).map(([abbreviation, icon]) => (
						<button type="button" key={abbreviation} className="hover:bg-gray-400 rounded-md">
							<img className="w-12 h-12" src={icon} alt={abbreviation} />
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default PieceSetupMenu;
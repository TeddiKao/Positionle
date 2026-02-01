import Square from "@/features/gameplay/pages/GamePage/components/ChessboardGrid/components/Square/Square";
import {files, ranks} from "@/features/gameplay/constants/coordinates";

function ChessboardGrid() {
	return (
		<div className="grid grid-cols-8 w-full aspect-square shadow-lg shadow-gray-600">
			{ranks.map((rank) => (
				files.map((file) => {
					return <Square key={`${file}${rank}`} file={file as "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"} rank={rank as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8} />
				})
			))}
		</div>
	)
}

export default ChessboardGrid;
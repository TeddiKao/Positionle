import type { BoardRepresentation } from "@/features/gameplay/types/chess";
import { files, ranks } from "@/features/gameplay/constants/coordinates";
import StaticSquare from "@/features/gameplay/components/GameEndModal/components/StaticChessboard/components/StaticSquare";

type StaticChessboardProps = {
	boardRepresentation: BoardRepresentation;
};

function StaticChessboard({ boardRepresentation }: StaticChessboardProps) {
	return (
		<div className="grid grid-cols-8 w-full max-w-1/2 aspect-square shadow-lg shadow-gray-600">
			{ranks.map((rank) =>
				files.map((file) => {
					return (
						<StaticSquare
							squareInfo={
								boardRepresentation[`${file}${rank}`] ?? null
							}
							file={file}
							rank={rank}
						/>
					);
				}),
			)}
		</div>
	);
}

export default StaticChessboard;

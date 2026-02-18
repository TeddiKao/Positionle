import type { BoardRepresentation } from "@/features/gameplay/types/chess";
import { files, ranks } from "@/features/gameplay/constants/coordinates";
import StaticSquare from "@/features/gameplay/components/GameEndModal/components/StaticChessboard/components/StaticSquare";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";

type StaticChessboardProps = {
	boardRepresentation: BoardRepresentation;
	squareColors?: Partial<Record<SquareCoordinate, string>>;
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
							key={`${file}${rank}`}
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

import type { SquareInfo } from "@/features/gameplay/types/chess";
import type { File, Rank } from "@/features/gameplay/types/coordinates";
import { getPieceIcon } from "@/features/gameplay/utils/pieceIconDetection";
import { clsx } from "clsx";
import { files } from "@/features/gameplay/constants/coordinates";

type StaticSquareProps = {
	squareInfo: SquareInfo | null;
	squareColorClass?: string;
	file: File;
	rank: Rank;
};

function StaticSquare({
	squareInfo,
	file,
	rank,
	squareColorClass,
}: StaticSquareProps) {
	const fileIndex = files.indexOf(file);
	const isDark = (rank + fileIndex) % 2 === 1;

	return (
		<div
			className={clsx(
				"relative",
				isDark ? "bg-gray-400" : "bg-gray-100",
				squareColorClass,
			)}
		>
			{squareInfo && squareInfo.color && squareInfo.piece && (
				<img
					alt={`${file}${rank}`}
					src={getPieceIcon(squareInfo.color, squareInfo.piece)}
					className="absolute z-40"
				/>
			)}
		</div>
	);
}

export default StaticSquare;

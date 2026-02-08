import type { SquareInfo } from "@/features/gameplay/types/chess";
import type { File, Rank } from "@/features/gameplay/types/coordinates";
import { getPieceIcon } from "@/features/gameplay/utils/pieceIconDetection";

type StaticSquareProps = {
	squareInfo: SquareInfo | null;
	file: File;
	rank: Rank;
};

function StaticSquare({ squareInfo, file, rank }: StaticSquareProps) {
	if (!squareInfo) return null;
	if (!squareInfo.color) return null;
	if (!squareInfo.piece) return null;

	return (
		<img
			alt={`${file}${rank}`}
			src={getPieceIcon(squareInfo.color, squareInfo.piece)}
		/>
	);
}

export default StaticSquare;

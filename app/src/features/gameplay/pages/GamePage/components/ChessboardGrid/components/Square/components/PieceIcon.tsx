import {getPieceIcon} from "@/features/gameplay/utils/pieceIconDetection";
import type {SquareInfo} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";

type PieceIconProps = {
	squareInfo: SquareInfo,
	coordinate: SquareCoordinate
}

function PieceIcon({ squareInfo, coordinate }: PieceIconProps) {
	const color = squareInfo.color;
	const piece = squareInfo.piece;

	const pieceIcon = getPieceIcon(color, piece);
	const key = `${coordinate} ${color} ${piece}`

	return (
		<img className="absolute" src={pieceIcon} key={key} alt={key} />
	)
}

export default PieceIcon;
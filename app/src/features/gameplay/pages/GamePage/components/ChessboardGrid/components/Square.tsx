import type {ChessPiece, PieceColor} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import {getPieceIcon} from "@/features/gameplay/utils/pieceIconDetection";

type SquareProps = {
	color: PieceColor,
	piece: ChessPiece
	coordinate: SquareCoordinate
}

function Square({ color, piece, coordinate }: SquareProps) {
	const pieceIcon = getPieceIcon(color, piece);

	return (
		<img key={`${coordinate} ${color} ${piece}`} src={pieceIcon}
			 alt={`${color} ${piece}`}/>
	)
}

export default Square;
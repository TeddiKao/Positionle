import type {ChessPiece, PieceColor} from "@/features/gameplay/types/chess";
import type {SquareCoordinate} from "@/features/gameplay/types/coordinates";
import {getPieceIcon} from "@/features/gameplay/utils/pieceIconDetection";
import {useDroppable} from "@dnd-kit/core";

type SquareProps = {
	color: PieceColor,
	piece: ChessPiece
	coordinate: SquareCoordinate
}

function Square({color, piece, coordinate}: SquareProps) {
	const {setNodeRef} = useDroppable({
		id: coordinate
	});

	const pieceIcon = getPieceIcon(color, piece);

	return (
		<div ref={setNodeRef}>
			<img key={`${coordinate} ${color} ${piece}`} src={pieceIcon}
								   alt={`${color} ${piece}`}/>
		</div>
	)
}

export default Square;
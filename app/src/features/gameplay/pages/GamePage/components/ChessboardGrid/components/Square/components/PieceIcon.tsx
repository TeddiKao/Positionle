import { getPieceIcon } from "@/features/gameplay/utils/pieceIconDetection";
import type { SquareInfo } from "@/features/gameplay/types/chess";
import type { SquareCoordinate } from "@/features/gameplay/types/coordinates";
import { useDraggable } from "@dnd-kit/core";

type PieceIconProps = {
	squareInfo: SquareInfo;
	coordinate: SquareCoordinate;
};

function PieceIcon({ squareInfo, coordinate }: PieceIconProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `from-square ${coordinate}`,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	const color = squareInfo.color;
	const piece = squareInfo.piece;

	const pieceIcon = getPieceIcon(color, piece);
	const key = `${coordinate} ${color} ${piece}`;

	return (
		<img
			style={style}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className="absolute z-40 touch-none pointer-events-auto"
			src={pieceIcon}
			key={key}
			alt={key}
		/>
	);
}

export default PieceIcon;

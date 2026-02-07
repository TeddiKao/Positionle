import { useDraggable } from "@dnd-kit/core";
import type { PieceAbbreviation } from "@/features/gameplay/types/abbreviations";

type PieceForSetupProps = {
	abbreviation: PieceAbbreviation;
	icon: string;
};

function PieceForSetup({ abbreviation, icon }: PieceForSetupProps) {
	const { isDragging, attributes, listeners, setNodeRef, transform } =
		useDraggable({
			id: `from-menu ${abbreviation}`,
		});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	return (
		<button
			style={style}
			ref={setNodeRef}
			type="button"
			key={abbreviation}
			{...listeners}
			{...attributes}
			className={`${isDragging ? "" : "hover:bg-gray-400"} rounded-md z-50`}
		>
			<img className="w-12 h-12" src={icon} alt={abbreviation} />
		</button>
	);
}

export default PieceForSetup;

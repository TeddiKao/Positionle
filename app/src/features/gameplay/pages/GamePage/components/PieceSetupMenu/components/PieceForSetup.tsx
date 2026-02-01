import {useDraggable} from "@dnd-kit/core";

type PieceForSetupProps = {
	abbreviation: string,
	icon: string,
}

function PieceForSetup({ abbreviation, icon }: PieceForSetupProps) {
	const { isDragging, attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `from-menu ${abbreviation}`
	});

	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;

	return isDragging ? (
		<button style={style} ref={setNodeRef} type="button" key={abbreviation} {...listeners} {...attributes} className="rounded-md z-50">
			<img className="w-12 h-12" src={icon} alt={abbreviation}/>
		</button>
	) : (
		<button style={style} ref={setNodeRef} type="button" key={abbreviation} {...listeners} {...attributes} className="hover:bg-gray-400 rounded-md z-50">
			<img className="w-12 h-12" src={icon} alt={abbreviation}/>
		</button>
	)
}

export default PieceForSetup;
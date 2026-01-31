import {useDraggable} from "@dnd-kit/core";

type PieceForSetupProps = {
	abbreviation: string,
	icon: string,
}

function PieceForSetup({ abbreviation, icon }: PieceForSetupProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: abbreviation
	});

	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;

	return (
		<button style={style} ref={setNodeRef} type="button" key={abbreviation} {...listeners} {...attributes} className="hover:bg-gray-400 rounded-md">
			<img className="w-12 h-12" src={icon} alt={abbreviation}/>
		</button>
	)
}

export default PieceForSetup;
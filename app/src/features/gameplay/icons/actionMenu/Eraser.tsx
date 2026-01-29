import {IconEraser} from "@tabler/icons-react";

type EraserIconProps = {
	className?: string;
}

function Eraser({ className = "" }: EraserIconProps) {
	return (
		<IconEraser className={className} />
	)
}

export default Eraser;
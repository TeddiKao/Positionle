import {IconTrash} from "@tabler/icons-react";

type TrashCanProps = {
	className?: string;
}

function TrashCan({ className = "" }: TrashCanProps) {
	return (
		<IconTrash className={className} />
	)
}

export default TrashCan;
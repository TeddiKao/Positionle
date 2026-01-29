import {IconRefresh} from "@tabler/icons-react";

type FlipIconProps = {
	className?: string;
}

function Flip({ className = "" }: FlipIconProps) {
	return (
		<IconRefresh className={className} />
	)
}

export default Flip;
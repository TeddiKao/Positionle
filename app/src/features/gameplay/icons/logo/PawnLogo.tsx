import {IconChess} from "@tabler/icons-react";

type PawnLogoProps = {
	className?: string;
}

function PawnLogo({ className = "" }: PawnLogoProps) {
	return (
		<span>
			<IconChess className={className} />
		</span>
	)
}

export default PawnLogo;
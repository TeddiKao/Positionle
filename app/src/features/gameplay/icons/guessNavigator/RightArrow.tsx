import {IconChevronRight} from "@tabler/icons-react";

type RightArrowProps = {
	className?: string;
}

function RightArrow({ className = "" }: RightArrowProps) {
	return (
		<IconChevronRight className={className} />
	)
}

export default RightArrow;
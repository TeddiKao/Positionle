import {IconChevronLeft} from "@tabler/icons-react";

type LeftArrowProps = {
	className?: string;
}

function LeftArrow({ className = "" }: LeftArrowProps) {
	return (
		<IconChevronLeft className={className} />
	)
}

export default LeftArrow;
import PawnLogo from "@/features/gameplay/icons/logo/PawnLogo";

function Logo() {
	return (
		<span className="flex flex-row items-end text-3xl font-bold mt-1.5 font-logo">
			{/* Pawn logo is used in place of the letter "i" */}
			<span>Pos</span>
			<PawnLogo className="inline-flex w-8 h-8 -ml-1" />
			<span className="-ml-1">t</span>
			<PawnLogo className="inline-flex w-8 h-8 -ml-1" />
			<span className="-ml-1">onle</span>
		</span>
	);
}

export default Logo;

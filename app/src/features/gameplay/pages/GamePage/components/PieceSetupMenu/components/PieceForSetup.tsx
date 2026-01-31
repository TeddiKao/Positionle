type PieceForSetupProps = {
	abbreviation: string,
	icon: string,
}

function PieceForSetup({ abbreviation, icon }: PieceForSetupProps) {
	return (
		<button type="button" key={abbreviation} className="hover:bg-gray-400 rounded-md">
			<img className="w-12 h-12" src={icon} alt={abbreviation}/>
		</button>
	)
}

export default PieceForSetup;
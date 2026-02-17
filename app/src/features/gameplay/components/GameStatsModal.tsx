import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

function GameStatsModal() {
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-base font-bold">
						Stats
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-4">
						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								10
							</span>
							<span className="text-center">Games played</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								80%
							</span>
							<span className="text-center">Win rate</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								7
							</span>
							<span className="text-center">Current streak</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								7
							</span>
							<span className="text-center">Highest streak</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default GameStatsModal;

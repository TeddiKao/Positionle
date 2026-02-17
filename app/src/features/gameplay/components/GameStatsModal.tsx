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
			</DialogContent>
		</Dialog>
	);
}

export default GameStatsModal;

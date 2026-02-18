import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

function HowToPlayModal() {
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-2xl font-bold">
						How to play
					</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default HowToPlayModal;

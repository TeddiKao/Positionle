import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useResetStatsAlertStore from "@/features/gameplay/stores/resetStatsAlert";
import useGameStatsStore from "@/features/gameplay/stores/gameStats";

function ResetStatsAlert() {
	const { isOpen, openResetStatsAlert, closeResetStatsAlert } =
		useResetStatsAlertStore();
	const { resetGameStats } = useGameStatsStore();

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={(open) => {
				if (open) {
					openResetStatsAlert();
				} else {
					closeResetStatsAlert();
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Reset stats?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you would like to reset your stats? This
						action cannot be undone
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogAction
						variant="destructive"
						onClick={resetGameStats}
					>
						Reset stats
					</AlertDialogAction>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ResetStatsAlert;

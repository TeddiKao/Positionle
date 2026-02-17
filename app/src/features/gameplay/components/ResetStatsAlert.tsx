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

function ResetStatsAlert() {
	return (
		<AlertDialog>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Reset stats?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you would like to reset your stats? This
						action cannot be undone
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogAction>Reset stats</AlertDialogAction>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ResetStatsAlert;

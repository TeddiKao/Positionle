import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu";
import CheckAnswerButton from "@/features/gameplay/pages/GamePage/components/CheckAnswerButton";

function GamePage() {
	return (
		<div className="flex flex-col items-center gap-4">
			<Logo />
			<GuessNavigator />

			<div className="grid grid-cols-3 w-full justify-center gap-4">
				<PieceSetupMenu />
				<ChessboardGrid />
				<ActionsMenu />
			</div>

			<CheckAnswerButton />
		</div>
	)
}

export default GamePage;
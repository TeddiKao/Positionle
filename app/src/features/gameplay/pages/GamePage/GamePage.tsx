import {Button} from "@/components/ui/button";
import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu";

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

			<Button type="button" className="w-full max-w-md hover:opacity-90">Check</Button>
		</div>
	)
}

export default GamePage;
import PawnLogo from "../../icons/logo/PawnLogo";
import LeftArrow from "../../icons/guessNavigator/LeftArrow";
import RightArrow from "../../icons/guessNavigator/RightArrow";
import {isSquareOnBottomEdge, isSquareOnLeftEdge} from "../../utils/edgeDetection";
import {Button} from "@/components/ui/button";
import Eraser from "@/features/gameplay/icons/actionMenu/Eraser";
import TrashCan from "@/features/gameplay/icons/actionMenu/TrashCan";
import Flip from "@/features/gameplay/icons/actionMenu/Flip";
import {blackPieceIcons, whitePieceIcons} from "@/features/gameplay/constants/pieceIcons";
import Logo from "@/features/gameplay/pages/GamePage/components/Logo";
import GuessNavigator from "@/features/gameplay/pages/GamePage/components/GuessNavigator";
import PieceSetupMenu from "@/features/gameplay/pages/GamePage/components/PieceSetupMenu";
import ChessboardGrid from "@/features/gameplay/pages/GamePage/components/ChessboardGrid";
import ActionsMenu from "@/features/gameplay/pages/GamePage/components/ActionsMenu";

function GamePage() {
	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

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
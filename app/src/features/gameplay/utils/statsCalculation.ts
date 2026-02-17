import type { GuessNumbers } from "@/features/gameplay/types/guesses";
import _ from "lodash";

function calculateWinRate(wins: number, gamesPlayed: number) {
	if (gamesPlayed === 0) return 0;

	const winPercentage = (wins / gamesPlayed) * 100;

	return Math.round(parseFloat(winPercentage.toFixed(1)));
}

function calculateTotalWins(winDistribution: Record<GuessNumbers, number>) {
	return _.sum(Object.values(winDistribution));
}

export { calculateWinRate, calculateTotalWins };

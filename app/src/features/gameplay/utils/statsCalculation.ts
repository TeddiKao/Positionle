import type { GuessNumbers } from "@/features/gameplay/types/guesses";
import _ from "lodash";

function calculateWinRate(wins: number, gamesPlayed: number) {
	if (gamesPlayed === 0) return 0;

	const winPercentage = (wins / gamesPlayed) * 100;

	if (winPercentage < 99) {
		return Math.round(winPercentage);
	} else {
		return parseFloat(winPercentage.toFixed(1));
	}
}

function calculateTotalWins(winDistribution: Record<GuessNumbers, number>) {
	return _.sum(Object.values(winDistribution));
}

function convertGamesWonDistributionToGraphData(
	guessDistribution: Record<GuessNumbers, number>,
) {
	const graphData: { tries: number; wins: number }[] = [];

	Object.entries(guessDistribution).forEach(([tries, wins]) => {
		graphData.push({
			tries: Number(tries),
			wins: Number(wins),
		});
	});

	return graphData;
}

export {
	calculateWinRate,
	calculateTotalWins,
	convertGamesWonDistributionToGraphData,
};

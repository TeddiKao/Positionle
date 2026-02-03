import type {File, Rank, SquareCoordinate} from "@/features/gameplay/types/coordinates";
import {files} from "@/features/gameplay/constants/coordinates";

function calculateFileDistance(fileA: File, fileB: File) {
	return Math.abs(files.indexOf(fileA) - files.indexOf(fileB));
}

function calculateRankDistance(rankA: Rank, rankB: Rank) {
	return Math.abs(rankA - rankB);
}

function calculateTaxiDistance(coordinateA: SquareCoordinate, coordinateB: SquareCoordinate) {
	const [coordinateAFile, coordinateARank] = coordinateA.split("");
	const [coordinateBFile, coordinateBRank] = coordinateB.split("");

	const fileDistance = calculateFileDistance(coordinateAFile as File, coordinateBFile as File);
	const rankDistance = calculateRankDistance(Number(coordinateARank) as Rank, Number(coordinateBRank) as Rank);

	return fileDistance + rankDistance;
}

export { calculateTaxiDistance }
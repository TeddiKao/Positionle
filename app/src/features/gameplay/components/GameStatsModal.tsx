import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
	calculateTotalWins,
	calculateWinRate,
	convertGamesWonDistributionToGraphData,
} from "@/features/gameplay/utils/statsCalculation";
import useGameStatsStore from "@/features/gameplay/stores/gameStats";
import useGameStatsModalStore from "@/features/gameplay/stores/gameStatsModal";
import useResetStatsAlertStore from "@/features/gameplay/stores/resetStatsAlert";

const chartConfig = {
	wins: {
		color: "#0f0f0f",
	},
} satisfies ChartConfig;

function GameStatsModal() {
	const {
		gamesPlayed,
		gamesWonDistribution,
		currentWinStreak,
		highestWinStreak,
	} = useGameStatsStore();

	const { isOpen, openGameStatsModal, closeModal } = useGameStatsModalStore();
	const { openResetStatsAlert } = useResetStatsAlertStore();

	const totalWins = calculateTotalWins(gamesWonDistribution);
	const winRate = calculateWinRate(totalWins, gamesPlayed);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (open) {
					openGameStatsModal();
				} else {
					closeModal();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-base font-bold">
						Stats
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-4">
						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								{gamesPlayed}
							</span>
							<span className="text-center">Games played</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								{winRate}%
							</span>
							<span className="text-center">Win rate</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								{currentWinStreak}
							</span>
							<span className="text-center">Current streak</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								{highestWinStreak}
							</span>
							<span className="text-center">Highest streak</span>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-bold">
							Win distribution (Total: {totalWins})
						</h3>

						<ChartContainer
							className="min-h-[30%]"
							config={chartConfig}
						>
							<BarChart
								layout="vertical"
								margin={{
									left: -44,
								}}
								accessibilityLayer
								data={convertGamesWonDistributionToGraphData(
									gamesWonDistribution,
								)}
							>
								<Bar dataKey="wins" radius={8}>
									<LabelList
										dataKey="wins"
										position="insideRight"
										offset={8}
										fontSize={12}
										className="fill-white"
										formatter={(value: number) =>
											value <= 0 ? "" : value
										}
									/>
								</Bar>
								<XAxis type="number" dataKey="wins" hide />
								<YAxis
									dataKey="tries"
									type="category"
									axisLine={false}
									tickLine={false}
								/>
							</BarChart>
						</ChartContainer>
					</div>
				</div>

				<DialogFooter>
					<Button
						onClick={openResetStatsAlert}
						type="button"
						variant="destructive"
					>
						Reset stats
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default GameStatsModal;

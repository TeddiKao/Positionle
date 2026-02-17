import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

const chartConfig = {
	wins: {
		color: "#0f0f0f",
	},
} satisfies ChartConfig;

function GameStatsModal() {
	return (
		<Dialog open={true}>
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
								10
							</span>
							<span className="text-center">Games played</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								80%
							</span>
							<span className="text-center">Win rate</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								7
							</span>
							<span className="text-center">Current streak</span>
						</div>

						<div className="flex flex-col">
							<span className="text-center font-bold text-2xl">
								7
							</span>
							<span className="text-center">Highest streak</span>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-bold">
							Win distribution (Total: 8)
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
								data={[
									{
										tries: 1,
										wins: 4,
									},

									{
										tries: 2,
										wins: 7,
									},

									{
										tries: 3,
										wins: 6,
									},

									{
										tries: 4,
										wins: 4,
									},

									{
										tries: 5,
										wins: 4,
									},

									{
										tries: 6,
										wins: 4,
									},
								]}
							>
								<Bar dataKey="wins" radius={8} />
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
					<Button type="button" variant="destructive">
						Reset stats
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default GameStatsModal;

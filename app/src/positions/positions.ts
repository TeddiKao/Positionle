type PositionData = {
	positionFen: string;
	source: string;
	whitePlayer: string | "NN";
	blackPlayer: string | "NN";
};

const positions: PositionData[] = [
	{
		positionFen: "B7/8/4b3/4kp2/6p1/6P1/1r3R2/6K1",
		source: "World Chess Championship 2024 Game 14",
		whitePlayer: "Ding Liren",
		blackPlayer: "Gukesh D",
	},
];

export { positions };

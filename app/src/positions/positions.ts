type PositionData = {
	positionFen: string;
	source: string;
	whitePlayer: string | "NN";
	blackPlayer: string | "NN";
	caption: string;
};

const positions: PositionData[] = [
	{
		positionFen: "B7/8/4b3/4kp2/6p1/6P1/1r3R2/6K1",
		source: "World Chess Championship 2024 Game 14",
		whitePlayer: "Ding Liren",
		blackPlayer: "Gukesh D",
		caption: "",
	},

	{
		positionFen:
			"r1bq1rk1/5pb1/1p1p2p1/1N1np2p/1p2P2P/5P2/PP1QN1P1/1K1R1B1R",
		source: "2nd UzChess Cup 2025",
		whitePlayer: "Praggnanandhaa R",
		blackPlayer: "Richard Rapport",
		caption: "",
	},

	{
		positionFen: "5r2/3N4/6p1/3pp3/6PP/1P4K1/4nR2/4k3",
		source: "Norway Chess 2025",
		whitePlayer: "Gukesh D",
		blackPlayer: "Magnus Carlsen",
		caption: "",
	},

	{
		positionFen: "1Q1Q4/6pk/5p1p/p3r3/P1P4R/6Pb/3r1q2/5RK1",
		source: "FIDE Grand Swiss 2025",
		whitePlayer: "Aditya Mittal",
		blackPlayer: "Yagiz Kaan Erdogmus",
		caption: "",
	},

	{
		positionFen: "rnbqk2r/pp1p2pp/2p5/3QPp2/4N3/5N2/PPP1KbPP/R1B2B1R",
		source: "FIDE World Cup 2025",
		whitePlayer: "Pentala Harikrishna",
		blackPlayer: "Nesterov, Arseniy",
		caption: "",
	},

	{
		positionFen: "2r3k1/2r2pb1/3pb1p1/1p2n1P1/1P2PP2/3Q1BK1/1B2Nq1R/7R",
		source: "Turkish Super League 2025",
		whitePlayer: "Denis Lazavik",
		blackPlayer: "Ediz Gurel",
		caption: "",
	},

	{
		positionFen: "r5k1/1p3p1p/2p1r1pq/2Q5/N1P1P3/3n1P1P/PPBR4/5R1K",
		source: "Tata Steel Chess 2026",
		whitePlayer: "Matthias Bluebaum",
		blackPlayer: "Javokhir Sindarov",
		caption: "",
	},

	{
		positionFen: "2q2rbk/4b1pp/1r6/4nPp1/3PN3/4P1Q1/1pR3BP/1R5K",
		source: "Tata Steel Chess 2026",
		whitePlayer: "Aravindh Chithambaram",
		blackPlayer: "Hans Niemann",
		caption: "",
	},

	{
		positionFen: "3Q4/1b3ppk/7p/8/p3q3/P1r1P1P1/1P3K1P/5R2",
		source: "Tata Steel Chess 2026",
		whitePlayer: "Gukesh D",
		blackPlayer: "Anish Giri",
		caption: "",
	},
];

export { positions };

import type { CorrectPositionInfo } from "@/features/gameplay/types/guesses";

const dualKingsideCastlingTest: CorrectPositionInfo = {
	correctPosition: {
		f1: { color: "white", piece: "rook" },
		g1: { color: "white", piece: "king" },
		f2: { color: "white", piece: "pawn" },
		g2: { color: "white", piece: "pawn" },
		h2: { color: "white", piece: "pawn" },

		f7: { color: "black", piece: "pawn" },
		g7: { color: "black", piece: "pawn" },
		h7: { color: "black", piece: "pawn" },
		f8: { color: "black", piece: "rook" },
		g8: { color: "black", piece: "king" },
	},
	source: "Unknown",
	whitePlayer: "NN",
	blackPlayer: "NN",
};

export { dualKingsideCastlingTest };

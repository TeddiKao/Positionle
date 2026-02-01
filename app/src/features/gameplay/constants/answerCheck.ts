import type {PieceAbbreviation} from "@/features/gameplay/types/abbreviations";

type PieceCounts = Record<PieceAbbreviation, number>

const pieceCounts: PieceCounts = {
	wP: 0,
	wN: 0,
	wB: 0,
	wR: 0,
	wQ: 0,
	wK: 0,

	bP: 0,
	bN: 0,
	bB: 0,
	bR: 0,
	bQ: 0,
	bK: 0
}

export { pieceCounts }
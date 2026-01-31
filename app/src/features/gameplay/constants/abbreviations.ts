type ColorAbbreviations = {
	white: "w",
	black: "b",
}

type PieceAbbreviations = {
	king: "K",
	queen: "Q",
	rook: "R",
	knight: "N",
	bishop: "B",
	pawn: "P",
}

const colorAbbreviations: ColorAbbreviations = {
	white: "w",
	black: "b",
}

const pieceAbbreviations: PieceAbbreviations = {
	king: "K",
	queen: "Q",
	rook: "R",
	knight: "N",
	bishop: "B",
	pawn: "P"
}

const abbreviationsToPieces = {
	K: "king",
	Q: "queen",
	R: "rook",
	N: "knight",
	B: "bishop",
	P: "pawn"
}

const abbreviationsToColors = {
	w: "white",
	b: "black"
}

export { colorAbbreviations, pieceAbbreviations, abbreviationsToColors, abbreviationsToPieces }
type ColorAbbreviations = "w" | "b";
type PieceNameAbbreviations = "P" | "N" | "B" | "R" | "Q" | "K";

type PieceAbbreviations = `${ColorAbbreviations}${PieceNameAbbreviations}`

export type { ColorAbbreviations, PieceNameAbbreviations, PieceAbbreviations };
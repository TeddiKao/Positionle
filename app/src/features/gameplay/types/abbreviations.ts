type ColorAbbreviations = "w" | "b";
type PieceNameAbbreviations = "P" | "N" | "B" | "R" | "Q" | "K";

type PieceAbbreviation = `${ColorAbbreviations}${PieceNameAbbreviations}`

export type { ColorAbbreviations, PieceNameAbbreviations, PieceAbbreviation };
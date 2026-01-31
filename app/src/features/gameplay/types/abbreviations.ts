type ColorAbbreviation = "w" | "b";
type PieceNameAbbreviation = "P" | "N" | "B" | "R" | "Q" | "K";

type PieceAbbreviation = `${ColorAbbreviation}${PieceNameAbbreviation}`

export type { ColorAbbreviation, PieceNameAbbreviation, PieceAbbreviation };
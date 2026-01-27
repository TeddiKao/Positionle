
// squareFile is a letter from a-h
function isSquareOnLeftEdge(squareFile: string, orientation: "white" | "black") {
	if (orientation === "white") {
		return squareFile === "a";
	} else {
		return squareFile === "h";
	}
}

// squareRank is a number from 1-8
function isSquareOnBottomEdge(squareRank: number, orientation: "white" | "black") {
	if (orientation === "white") {
		return squareRank === 1;
	} else {
		return squareRank === 8;
	}
}

export { isSquareOnLeftEdge, isSquareOnBottomEdge }
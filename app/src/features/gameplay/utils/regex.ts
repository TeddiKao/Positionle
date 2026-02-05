function isUpperCase(char: string): boolean {
	return /[A-Z]/.test(char);
}

function isCharDigit(char: string): boolean {
	return /^\d$/.test(char);
}

export { isUpperCase, isCharDigit };

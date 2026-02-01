function getColorByDistance(distance: number, isDark: boolean) {
	switch (true) {
		case (distance >= 1 && distance <= 3):
			if (isDark) {
				return "bg-yellow-800"
			} else {
				return "bg-yellow-700"
			}

		case (distance >= 4 && distance <= 6):
			if (isDark) {
				return "bg-yellow-600"
			} else {
				return "bg-yellow-500"
			}

		case (distance >= 7 && distance <= 9):
			if (isDark) {
				return "bg-yellow-400"
			} else {
				return "bg-yellow-300"
			}

		case (distance >= 10 && distance <= 14):
			if (isDark) {
				return "bg-yellow-200"
			} else {
				return "bg-yellow-100"
			}
	}
}

export { getColorByDistance }
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GuessNumbers } from "@/features/gameplay/types/guesses";

type GameStatsStore = {
	gamesPlayed: number;
	incrementGamesPlayed: () => void;

	gamesWonDistribution: Record<GuessNumbers, number>;
	incrementGamesWon: (numberOfTries: GuessNumbers) => void;

	currentWinStreak: number;
	highestWinStreak: number;
	increaseCurrentWinStreak: () => void;

	resetGameStats: () => void;
};

const useGameStatsStore = create<GameStatsStore>()(
	persist(
		(set, _get, store) => ({
			gamesPlayed: 0,
			incrementGamesPlayed: () => {
				set((state) => ({ gamesPlayed: state.gamesPlayed + 1 }));
			},

			gamesWonDistribution: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
				6: 0,
			},
			incrementGamesWon: (numberOfTries) => {
				set((state) => ({
					gamesWonDistribution: {
						...state.gamesWonDistribution,
						[numberOfTries]:
							state.gamesWonDistribution[numberOfTries] + 1,
					},
				}));
			},

			currentWinStreak: 0,
			highestWinStreak: 0,
			increaseCurrentWinStreak: () => {
				set((state) => ({
					currentWinStreak: state.currentWinStreak + 1,
					highestWinStreak: Math.max(
						state.currentWinStreak + 1,
						state.highestWinStreak,
					),
				}));
			},

			resetGameStats: () => set(store.getInitialState()),
		}),
		{ name: "gameStats", storage: createJSONStorage(() => localStorage) },
	),
);

export default useGameStatsStore;

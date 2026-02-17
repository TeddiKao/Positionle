import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GuessNumbers } from "@/features/gameplay/types/guesses";

type GameStatsStore = {
	gamesPlayed: number;
	incrementGamesPlayed: () => void;

	gamesWonDistribution: Record<GuessNumbers, number>;
	incrementGamesWon: (numberOfTries: GuessNumbers) => void;

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

			resetGameStats: () => set(store.getInitialState()),
		}),
		{ name: "gameStats", storage: createJSONStorage(() => localStorage) },
	),
);

export default useGameStatsStore;

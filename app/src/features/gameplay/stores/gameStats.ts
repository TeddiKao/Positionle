import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GameStatsStore = {
	gamesPlayed: number;
	incrementGamesPlayed: () => void;

	gamesWon: number;
	incrementGamesWon: () => void;

	resetGameStats: () => void;
};

const useGameStatsStore = create<GameStatsStore>()(
	persist(
		(set, _get, store) => ({
			gamesPlayed: 0,
			incrementGamesPlayed: () => {
				set((state) => ({ gamesWon: state.gamesWon + 1 }));
			},

			gamesWon: 0,
			incrementGamesWon: () => {
				set((state) => ({ gamesWon: state.gamesWon + 1 }));
			},

			resetGameStats: () => set(store.getInitialState()),
		}),
		{ name: "gameStats", storage: createJSONStorage(() => localStorage) },
	),
);

export default useGameStatsStore;

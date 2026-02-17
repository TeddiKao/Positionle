import { create } from "zustand";

type GameStatsModalStore = {
	isOpen: boolean;
	openGameStatsModal: () => void;
	closeModal: () => void;
};

const useGameStatsModalStore = create<GameStatsModalStore>((set) => ({
	isOpen: false,
	openGameStatsModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
}));

export default useGameStatsModalStore;

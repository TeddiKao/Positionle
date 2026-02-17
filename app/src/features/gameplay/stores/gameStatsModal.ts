import { create } from "zustand";

type GameStatsModalStore = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const useGameStatsModalStore = create<GameStatsModalStore>((set) => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
}));

export default useGameStatsModalStore;

import { create } from "zustand";

type GameEndModalStore = {
	isOpen: boolean;
	openGameEndModal: () => void;
	closeModal: () => void;
};

const useGameEndModalStore = create<GameEndModalStore>((set) => ({
	isOpen: false,
	openGameEndModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
}));

export default useGameEndModalStore;

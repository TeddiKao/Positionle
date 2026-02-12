import { create } from "zustand";

type GameEndModalStore = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const useGameEndModalStore = create<GameEndModalStore>((set) => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
}));

export default useGameEndModalStore;

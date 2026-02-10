import { create } from "zustand";

type GameEndModalStore = {
	open: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const useGameEndModalStore = create<GameEndModalStore>((set) => ({
	open: false,
	openModal: () => set({ open: true }),
	closeModal: () => set({ open: false }),
}));

export default useGameEndModalStore;

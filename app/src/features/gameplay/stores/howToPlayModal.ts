import { create } from "zustand";

type HowToPlayModalStore = {
	isOpen: boolean;
	openHowToPlayModal: () => void;
	closeHowToPlayModal: () => void;
};

const useHowToPlayModalStore = create<HowToPlayModalStore>((set) => ({
	isOpen: false,
	openHowToPlayModal: () => set({ isOpen: true }),
	closeHowToPlayModal: () => set({ isOpen: false }),
}));

export default useHowToPlayModalStore;

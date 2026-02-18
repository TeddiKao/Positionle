import { create } from "zustand";

type ResetStatsAlertStore = {
	isOpen: boolean;
	openResetStatsAlert: () => void;
	closeResetStatsAlert: () => void;
};

const useResetStatsAlertStore = create<ResetStatsAlertStore>((set) => ({
	isOpen: false,
	openResetStatsAlert: () => set({ isOpen: true }),
	closeResetStatsAlert: () => set({ isOpen: false }),
}));

export default useResetStatsAlertStore;

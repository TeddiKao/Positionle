import { create } from "zustand";

type DistanceDisplayStore = {
	isShowingExactDistances: boolean;
	showExactDistances: () => void;
	hideExactDistances: () => void;
};

const useDistanceDisplayStore = create<DistanceDisplayStore>((set) => ({
	isShowingExactDistances: false,
	showExactDistances: () => set({ isShowingExactDistances: true }),
	hideExactDistances: () => set({ isShowingExactDistances: false }),
}));

export { useDistanceDisplayStore };

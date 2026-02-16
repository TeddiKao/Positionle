import type { CanvasPath } from "react-sketch-canvas";
import { create } from "zustand";

type AnnotationToolbarStore = {
	updateAnnotations: (annotations: CanvasPath[]) => void;

	isAnnotationEraserActive: () => void;
	activateAnnotationEraser: () => void;
	deactivateAnnotationEraser: () => void;
};

const useAnnotationToolbarStore = create((set) => {});

export default useAnnotationToolbarStore;

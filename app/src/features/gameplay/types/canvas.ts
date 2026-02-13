type CanvasPoint = { x: number; y: number };

type CanvasStroke = {
	tool: string;
	strokeColor: string;
	strokeWidth: number;
	paths: CanvasPoint[];
};

type CanvasPaths = CanvasStroke[];

export type { CanvasPaths };

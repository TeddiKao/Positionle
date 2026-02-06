interface ImportMetaEnv {
	readonly VITE_USE_DEV_POSITION: string;
	readonly VITE_DEV_POSITION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

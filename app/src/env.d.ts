interface ImportMetaEnv {
	readonly VITE_USE_DEV_POSITION: string;
	readonly VITE_PUBLIC_POSTHOG_KEY: string;
	readonly VITE_PUBLIC_POSTHOG_HOST: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

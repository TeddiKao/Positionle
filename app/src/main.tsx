import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { PostHogProvider } from "@posthog/react";

const options = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
	defaults: "2026-01-30",
} as const;

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<PostHogProvider
				apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
				options={options}
			>
				<App />
			</PostHogProvider>
		</BrowserRouter>
	</StrictMode>,
);

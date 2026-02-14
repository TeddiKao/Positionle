import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";

import { posthog } from "posthog-js";
import { PostHogProvider } from "@posthog/react";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
	defaults: "2026-01-30",
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<PostHogProvider client={posthog}>
				<App />
			</PostHogProvider>
		</BrowserRouter>
	</StrictMode>,
);

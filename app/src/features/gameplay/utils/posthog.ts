import { posthog } from "posthog-js";

function captureEvent(
	eventName: string,
	additionalProps?: Record<string, unknown>,
) {
	if (!import.meta.env.PROD) return;

	posthog.capture(eventName, additionalProps);
}

export { captureEvent };

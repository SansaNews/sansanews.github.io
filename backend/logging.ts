export enum LogLevel {
	FATAL = "FATAL",
	ERROR = "ERROR",
	WARN = "WARN",
	INFO = "INFO",
	DEBUG = "DEBUG",
}

const debugMode = process.env.DEBUG === "true";

export function log(level: LogLevel, message: string, error?: unknown) {
	const entry = {
		level,
		message,
		timestamp: new Date().toISOString(),
		...(error !== undefined && {
			error:
				error instanceof Error ? (error.stack ?? error.message) : String(error),
		}),
	};

	if (level === LogLevel.FATAL || level === LogLevel.ERROR) {
		console.error(entry);
	} else if (level === LogLevel.WARN) {
		console.warn(entry);
	} else if (level === LogLevel.INFO) {
		console.info(entry);
	} else if (level === LogLevel.DEBUG && debugMode) {
		console.debug(entry);
	}
}

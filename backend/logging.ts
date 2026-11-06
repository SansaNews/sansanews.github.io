export enum LogLevel {
	FATAL = "FATAL",
	ERROR = "ERROR",
	WARN = "WARN",
	INFO = "INFO",
	DEBUG = "DEBUG",
}

const debugMode = process.env.DEBUG === "true";

const consoleMethods: Record<LogLevel, (entry: object) => void> = {
	[LogLevel.FATAL]: console.error,
	[LogLevel.ERROR]: console.error,
	[LogLevel.WARN]: console.warn,
	[LogLevel.INFO]: console.info,
	[LogLevel.DEBUG]: console.debug,
};

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

	if (level === LogLevel.DEBUG && !debugMode) return;
	consoleMethods[level](entry);
}

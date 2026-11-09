export type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface Media {
	id: string;
	caption: string;
	category: string;
	datePublished: Date;
	permalink: string;
	type: MediaType;
	username: string;
	videoURL?: string;
	dimensions: {
		width: number;
		height: number;
	};
}

interface RawMedia {
	id: string;
	caption?: string;
	category: string;
	timestamp: string;
	permalink: string;
	media_type: string;
	username: string;
	dimensions: { width: number; height: number };
	video_url?: string;
}

export function jsonToMedia(json: RawMedia[]): Media[] {
	return json.map((media) => ({
		id: media.id,
		caption: media.caption || "Sin descripción",
		category: media.category,
		datePublished: new Date(media.timestamp),
		permalink: media.permalink,
		type: media.media_type as MediaType,
		username: media.username,
		dimensions: media.dimensions,
		videoURL: media.video_url || undefined,
	}));
}

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getDate() === b.getDate() &&
		a.getMonth() === b.getMonth() &&
		a.getFullYear() === b.getFullYear()
	);
}

export function getTimeCategory(date: Date, now: Date = new Date()): string {
	const diffTime = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (isSameDay(date, now)) {
		return "Hoy";
	}

	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	if (isSameDay(date, yesterday)) {
		return "Ayer";
	}

	if (diffDays <= 7) return "Última Semana";

	return "Último Mes";
}

export function formatDatetime(then: Date, now: Date = new Date()): string {
	let diffSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
	diffSeconds = Math.max(diffSeconds, 0); // Avoid negative values

	if (diffSeconds < 60) {
		return "Hace menos de un minuto";
	}

	const diffMinutes = Math.floor(diffSeconds / 60);
	if (diffMinutes < 60) {
		if (diffMinutes === 1) return "Hace 1 minuto";
		return `Hace ${diffMinutes} minutos`;
	}

	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);

	if (isSameDay(then, yesterday)) {
		return "Ayer";
	}

	const diffHours = Math.floor(diffMinutes / 60);
	if (diffHours < 24) {
		if (diffHours === 1) return "Hace 1 hora";
		return `Hace ${diffHours} horas`;
	}

	// DD/MM/YYYY
	return then.toLocaleDateString("en-GB");
}

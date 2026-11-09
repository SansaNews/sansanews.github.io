/// <reference types="bun" />
import { expect, test } from "bun:test";
import { formatDatetime, getTimeCategory, jsonToMedia } from "./media.ts";

// Local time, so the tests pass in any time zone.
const at = (day: number, hour: number) => new Date(2026, 10, day, hour);

test("formatDatetime: a post from yesterday shows 'Ayer', not hours (5fd0b49)", () => {
	expect(formatDatetime(at(8, 23), at(9, 1))).toBe("Ayer");
});

test("formatDatetime: thresholds and future dates", () => {
	const now = at(9, 12);
	expect(formatDatetime(at(9, 13), now)).toBe("Hace menos de un minuto");
	expect(formatDatetime(new Date(now.getTime() - 60_000), now)).toBe(
		"Hace 1 minuto",
	);
	expect(formatDatetime(at(9, 11), now)).toBe("Hace 1 hora");
	expect(formatDatetime(at(9, 2), now)).toBe("Hace 10 horas");
	expect(formatDatetime(at(1, 12), now)).toBe("01/11/2026");
});

test("getTimeCategory: uses the current date, not the build date (ce8360c)", () => {
	expect(getTimeCategory(new Date())).toBe("Hoy");
	const now = at(9, 1);
	expect(getTimeCategory(at(9, 0), now)).toBe("Hoy");
	expect(getTimeCategory(at(8, 23), now)).toBe("Ayer");
	expect(getTimeCategory(at(3, 12), now)).toBe("Última Semana");
	expect(getTimeCategory(at(1, 0), now)).toBe("Último Mes");
});

test("jsonToMedia: empty video_url gives no videoURL (cbd45cf)", () => {
	const raw = {
		id: "a",
		category: "USM",
		timestamp: "2026-11-09T12:00:00Z",
		permalink: "https://www.instagram.com/p/a/",
		media_type: "VIDEO",
		username: "usm",
		dimensions: { width: 1, height: 1 },
	};
	const [noUrl, withUrl] = jsonToMedia([
		{ ...raw, video_url: "" },
		{ ...raw, caption: "Hola", video_url: "https://x/v.mp4" },
	]);
	expect(noUrl?.videoURL).toBeUndefined();
	expect(noUrl?.caption).toBe("Sin descripción");
	expect(withUrl?.videoURL).toBe("https://x/v.mp4");
	expect(withUrl?.datePublished.getTime()).toBe(Date.UTC(2026, 10, 9, 12));
});

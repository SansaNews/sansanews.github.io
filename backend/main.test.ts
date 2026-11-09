import { expect, test } from "bun:test";
import { cleanMedia, isAllowedHost, processUserMedia } from "./main.ts";

test("isAllowedHost: exact host or subdomain only", () => {
	expect(isAllowedHost("https://scontent.cdninstagram.com/a.jpg")).toBe(true);
	expect(isAllowedHost("https://fbcdn.net/a.jpg")).toBe(true);
	expect(isAllowedHost("https://evilcdninstagram.com/a.jpg")).toBe(false);
	expect(isAllowedHost("https://cdninstagram.com.evil.com/a.jpg")).toBe(false);
	expect(isAllowedHost("not a url")).toBe(false);
});

test("processUserMedia: a post whose image fails is dropped", async () => {
	const post = {
		id: "1",
		timestamp: "2026-11-09T12:00:00+0000",
		permalink: "https://www.instagram.com/p/ABC/",
		media_type: "IMAGE",
		media_url: "https://blocked.example/a.jpg",
	};
	const posts = await processUserMedia(
		"usm",
		{ business_discovery: { media: { data: [post] } } },
		"USM",
	);
	expect(posts).toEqual([]);
});

test("cleanMedia: a video without media_url gets no video_url", () => {
	const post = {
		id: "1",
		timestamp: "2026-11-09T12:00:00+0000",
		permalink: "https://www.instagram.com/p/ABC/",
		media_type: "VIDEO",
		thumbnail_url: "https://x/t.jpg",
	};
	const noUrl = cleanMedia({ ...post });
	const withUrl = cleanMedia({ ...post, media_url: "https://x/v.mp4" });
	expect(noUrl.video_url).toBeUndefined();
	expect(noUrl).not.toHaveProperty("thumbnail_url");
	expect(withUrl.video_url).toBe("https://x/v.mp4");
	expect(withUrl).not.toHaveProperty("media_url");
});

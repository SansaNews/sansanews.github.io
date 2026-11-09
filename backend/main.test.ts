import { expect, test } from "bun:test";
import { isAllowedHost, processUserMedia } from "./main.ts";

test("isAllowedHost: exact host or subdomain only (af03ae0)", () => {
	expect(isAllowedHost("https://scontent.cdninstagram.com/a.jpg")).toBe(true);
	expect(isAllowedHost("https://fbcdn.net/a.jpg")).toBe(true);
	expect(isAllowedHost("https://evilcdninstagram.com/a.jpg")).toBe(false);
	expect(isAllowedHost("https://cdninstagram.com.evil.com/a.jpg")).toBe(false);
	expect(isAllowedHost("not a url")).toBe(false);
});

test("processUserMedia: a video without media_url gets no video_url (cbd45cf)", async () => {
	const post = {
		timestamp: "2026-11-09T12:00:00+0000",
		permalink: "https://www.instagram.com/p/ABC/",
		media_type: "VIDEO",
		// Not an allowed host, so optimizeImage makes no request.
		thumbnail_url: "https://blocked.example/t.jpg",
	};
	const [noUrl, withUrl] = await processUserMedia(
		"usm",
		{
			business_discovery: {
				media: {
					data: [
						{ ...post, id: "1" },
						{ ...post, id: "2", media_url: "https://x/v.mp4" },
					],
				},
			},
		},
		"USM",
	);
	expect(noUrl).toMatchObject({
		id: "usm-ABC",
		username: "usm",
		category: "USM",
	});
	expect(noUrl.video_url).toBeUndefined();
	expect(noUrl).not.toHaveProperty("media_url");
	expect(withUrl.video_url).toBe("https://x/v.mp4");
});

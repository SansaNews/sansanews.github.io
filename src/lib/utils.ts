import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { asset } from "$app/paths";
import type { AssetPath } from "$app/types";
import { isMock } from "./mediaData.js";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function makeSrcset(basePath: string, id: string, baseWidth: number) {
	if (isMock) return { src: asset("placeholder.svg"), srcset: "" };
	const file = (scale: number) =>
		asset(`${basePath}/${id}-${scale}x.webp` as AssetPath);
	const srcset = `
		${file(1)} ${baseWidth}w,
		${file(2)} ${baseWidth * 2}w,
		${file(3)} ${baseWidth * 3}w
	`;
	return { src: file(1), srcset };
}

export type WithoutChild<T> = T extends { child?: unknown }
	? Omit<T, "child">
	: T;
export type WithoutChildren<T> = T extends { children?: unknown }
	? Omit<T, "children">
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};

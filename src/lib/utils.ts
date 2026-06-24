import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { asset } from "$app/paths";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function makeSrcset(basePath: string, id: string, baseWidth: number) {
	const src = asset(`${basePath}/${id}-1x.webp`);
	const srcset = `
		${asset(`${basePath}/${id}-1x.webp`)} ${baseWidth}w,
		${asset(`${basePath}/${id}-2x.webp`)} ${baseWidth * 2}w,
		${asset(`${basePath}/${id}-3x.webp`)} ${baseWidth * 3}w
	`;
	return { src, srcset };
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

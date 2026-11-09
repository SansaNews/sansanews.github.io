const files = import.meta.glob("./assets/media*.json", {
	eager: true,
	import: "default",
});

export const isMock = import.meta.env.DEV && "./assets/media.dry.json" in files;

export default files[
	isMock ? "./assets/media.dry.json" : "./assets/media.json"
] as typeof import("./assets/media.json");

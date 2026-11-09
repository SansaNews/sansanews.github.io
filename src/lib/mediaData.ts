const files = import.meta.glob("./assets/media*.json", {
	eager: true,
	import: "default",
});

export const isMock = import.meta.env.DEV && "./assets/media.dry.json" in files;

const file = isMock ? "./assets/media.dry.json" : "./assets/media.json";
if (!(file in files)) {
	throw new Error(`${file} not found in src/lib/assets. Run \`just update\`.`);
}

export default files[file] as typeof import("./assets/media.json");

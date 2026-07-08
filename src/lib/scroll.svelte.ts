class HideOnScroll {
	#lastY = 0;
	hidden = $state(false);

	start() {
		window.addEventListener("scroll", this.#onScroll, { passive: true });
	}

	readonly #onScroll = () => {
		const y = window.scrollY;
		this.hidden = y > this.#lastY && y > 10;
		this.#lastY = y;
	};
}

const instance = new HideOnScroll();

$effect.root(() => {
	instance.start();
});

export function hideOnScroll() {
	return {
		hidden: () => instance.hidden,
	};
}

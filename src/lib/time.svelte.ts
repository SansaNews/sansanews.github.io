class ClientTime {
	isMounted = $state(false);
	now = $state(new Date());
	#interval: ReturnType<typeof setInterval> | undefined;

	start() {
		if (this.#interval) return;
		this.isMounted = true;
		this.now = new Date();
		this.#interval = setInterval(() => {
			this.now = new Date();
		}, 60 * 1000);
	}
}

const clientTime = new ClientTime();

$effect.root(() => {
	clientTime.start();
});

export function useClientTime() {
	return clientTime;
}

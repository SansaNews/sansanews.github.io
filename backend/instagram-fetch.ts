export interface FetchConfig {
	url: string;
	accessToken: string;
	timeoutSeconds: number;
}

export async function fetchBusinessDiscovery(
	_username: string,
	fields: string,
	config: FetchConfig,
): Promise<Response> {
	const url = new URL(config.url);
	url.searchParams.append("fields", fields);
	return fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		signal: AbortSignal.timeout(config.timeoutSeconds * 1000),
	});
}
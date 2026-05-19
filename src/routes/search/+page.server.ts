import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ fetch, url }) => {
	const q = url.searchParams.get('q') || '';

	const res = await fetch(`/apisearch?q=${encodeURIComponent(q)}`);
	const results = (await res.json()).results;

	return {
		q,
		results
	};
};

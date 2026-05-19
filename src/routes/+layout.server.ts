import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('token');

	if (!token) {
		return {
			me: null
		};
	}

	// discord me
	const res = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!res.ok) {
		cookies.delete('token', { path: '/' });
		return {
			me: null
		};
	}

	const me = await res.json();

	return {
		me
	};
};

import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('token');

	let me = null;
	if (token) {
		const res = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (res.ok) {
			me = await res.json();
		}
	}

	const discordRedirectUri = process.env.DISCORD_REDIRECT_URI;

	return { me, discordRedirectUri };
};

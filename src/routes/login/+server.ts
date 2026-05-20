import { db } from '$lib/database';
import { redirect, type RequestHandler } from '@sveltejs/kit';

// discord oauth2 get oauth2 token
export const GET: RequestHandler = async ({ cookies, url }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		throw new Error('No code provided');
	}

	const response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: process.env.DISCORD_CLIENT_ID!,
			client_secret: process.env.DISCORD_CLIENT_SECRET!,
			grant_type: 'authorization_code',
			code,
			redirect_uri: process.env.DISCORD_REDIRECT_URI!
		})
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error_description || 'Failed to get access token');
	}

	const { access_token } = data;

	// get user info from discord
	const userResponse = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	const userData = await userResponse.json();

	if (!userResponse.ok) {
		throw new Error(userData.error_description || 'Failed to get user info');
	}

	await db`
    INSERT INTO users (id, username)
    VALUES (${userData.id}, ${userData.username})
    ON DUPLICATE KEY UPDATE username = ${userData.username}
  `;

	cookies.set('token', access_token, { path: '/' });
	return redirect(302, '/');
};

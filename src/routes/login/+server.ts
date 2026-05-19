import { db } from '$lib/database';
import { redirect, type RequestHandler } from '@sveltejs/kit';

// discord oauth2 callback handler
export const GET: RequestHandler = async ({ cookies }) => {
	const data = new URLSearchParams({
		client_id: process.env.DISCORD_CLIENT_ID!,
		client_secret: process.env.DISCORD_CLIENT_SECRET!,
		grant_type: 'client_credentials',
		scope: 'identify'
	});

	const response = await fetch('https://discord.com/api/v10/oauth2/token', {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch access token');
	}

	const tokenData = await response.json();
	console.log(tokenData.access_token);
	cookies.set('token', tokenData.access_token, { path: '/' });

	const me = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${tokenData.access_token}`
		}
	});

	if (!me.ok) {
		throw new Error('Failed to fetch user data');
	}

	const userData = await me.json();
	console.log(userData);

	// Store the user data in the database
	await db`
    INSERT INTO users (id, username)
    VALUES (${userData.id}, ${userData.username})
    ON DUPLICATE KEY UPDATE username = ${userData.username}
  `;

	return redirect(302, '/');
};

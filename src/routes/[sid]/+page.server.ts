import { db } from '$lib/database';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	const sid = parseInt(params.sid || '0');

	const sentence = (
		await db`SELECT s.*, u.username FROM sentences s JOIN users u ON s.user_id = u.id WHERE s.id = ${sid}`
	)[0];

	return { sentence };
};

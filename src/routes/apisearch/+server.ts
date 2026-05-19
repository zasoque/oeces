import { db } from '$lib/database';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q') || '';

	const results =
		await db`SELECT s.*, u.username FROM sentences s JOIN users u ON s.user_id = u.id WHERE s.content LIKE ${'%' + q + '%'} LIMIT 10`;

	return json({ success: true, results: results });
};

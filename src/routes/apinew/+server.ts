import { db } from '$lib/database';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
	const token = cookies.get('token');

	if (!token) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const me = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!me.ok) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const userData = await me.json();
	const userId = userData.id;

	// const { sentence, title, language, source, notes, keywords } = await request.formData();
	const formData = await request.formData();
	const sentence = formData.get('sentence') as string;
	const title = formData.get('title') as string;
	const language = formData.get('language') as string;
	const source = formData.get('source') as string;
	const notes = formData.get('notes') as string;
	const keywords = formData.get('keywords') as string;

	if (!sentence || !title) {
		return json({ success: false, message: 'Sentence and title are required.' }, { status: 400 });
	}

	const keywordsArray = keywords
		.split(',')
		.map((keyword: string) => keyword.trim())
		.filter((keyword: string) => keyword.length > 0);

	const result = await db`
    INSERT INTO sentences (content, user_id, title, language, source, notes)
    VALUES (${sentence}, ${userId}, ${title}, ${language}, ${source}, ${notes})
  `;

	for (const keyword of keywordsArray) {
		await db`
      INSERT INTO keywords (sentence_id, keyword)
      VALUES (${result.insertId}, ${keyword})
    `;
	}

	return redirect(303, `/`);
};

import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 302,
		headers: {
			Location: '/',
			'Set-Cookie': 'access=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
		}
	};
};

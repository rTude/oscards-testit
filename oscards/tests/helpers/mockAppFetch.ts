import { vi } from 'vitest';
import { movies, people } from '../fixtures/data';

type PosterResponse = {
	description: { '#IMG_POSTER': string }[];
};

export function mockAppFetch(
	posterResponse: PosterResponse = {
		description: [{ '#IMG_POSTER': 'https://images.example.test/poster.jpg' }]
	}
) {
	const fetchMock = vi.fn(async (input: RequestInfo | URL) => ({
		json: async () => {
			const url = String(input);

			if (url === '/data/people.json') return people;
			if (url === '/data/movies.json') return movies;
			if (url.startsWith('https://imdb.iamidiotareyoutoo.com/search?')) return posterResponse;

			throw new Error(`Unexpected fetch request: ${url}`);
		}
	}));

	vi.stubGlobal('fetch', fetchMock);
	return fetchMock;
}

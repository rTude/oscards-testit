// Testaa julisteen hakua, näyttämistä ja puuttuvan julisteen käsittelyä
import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Poster from '../src/lib/Poster.svelte';
import { mockAppFetch } from './helpers/mockAppFetch';

describe('Poster', () => {
	it('fetches and displays the movie poster', async () => {
		const fetchMock = mockAppFetch();

		render(Poster, { props: { elokuvaTunnus: 'tt0407887' } });

		expect(fetchMock).toHaveBeenCalledWith('https://imdb.iamidiotareyoutoo.com/search?q=tt0407887');
		await waitFor(() => {
			expect(screen.getByRole('img', { name: 'Poster' })).toHaveAttribute(
				'src',
				'https://images.example.test/poster.jpg'
			);
		});
	});

	it('uses an empty image source when no poster is returned', async () => {
		mockAppFetch({ description: [] });

		render(Poster, { props: { elokuvaTunnus: 'tt3783958' } });

		await waitFor(() => {
			expect(screen.getByRole('img', { name: 'Poster' })).toHaveAttribute('src', '');
		});
	});
});

// Testaa elokuvakortin tietoja, suosikkeja ja puuttuvan julisteen käsittelyä
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MovieCard from '../src/lib/MovieCard.svelte';
import { favorite } from '../src/lib/favorites.svelte';
import { favoriteMessage } from '../src/lib/favoriteMessageStore';
import { modalVisible } from '../src/lib/modalStore';
import { mockAppFetch } from './helpers/mockAppFetch';

function resetFavorites() {
	for (const id of [...favorite.fav]) favorite.unfav = id;
	modalVisible.set(false);
	favoriteMessage.set('Added to favorites');
}

describe('MovieCard', () => {
	beforeEach(() => {
		mockAppFetch();
		resetFavorites();
	});

	it('displays movie details, the poster, and a working streaming link', async () => {
		render(MovieCard, { props: { elokuvaTunnus: 'tt0407887' } });

		expect(await screen.findByRole('heading', { name: 'The Departed' })).toBeInTheDocument();
		expect(screen.getByText('Year: 2006')).toBeInTheDocument();
		expect(screen.getByText('2h 31min')).toBeInTheDocument();
		expect(screen.getByText('IMDb rating: 8.5')).toBeInTheDocument();
		expect(screen.getByText('x 4')).toBeInTheDocument();

		const streamingLink = screen.getByRole('link');
		expect(streamingLink).toHaveAttribute('href', 'https://www.netflix.com/title/example');
		expect(streamingLink.querySelector('img')).toHaveAttribute(
			'src',
			'/img/streamingApps/Netflix.png'
		);

		await waitFor(() => {
			expect(screen.getByRole('img', { name: 'Poster' })).toHaveAttribute(
				'src',
				'https://images.example.test/poster.jpg'
			);
		});
	});

	it('shows unavailable streaming information and adds/removes the movie from favorites', async () => {
		render(MovieCard, { props: { elokuvaTunnus: 'tt3783958' } });

		expect(await screen.findByRole('heading', { name: 'La La Land' })).toBeInTheDocument();
		expect(screen.getByText('Not available')).toBeInTheDocument();

		const favoriteButton = screen.getByRole('button', { name: 'favorite' });
		await fireEvent.click(favoriteButton);
		expect(favorite.fav).toContain('tt3783958');
		expect(get(favoriteMessage)).toBe('Added to favorites');
		expect(get(modalVisible)).toBe(true);

		await fireEvent.click(favoriteButton);
		expect(favorite.fav).not.toContain('tt3783958');
		expect(get(favoriteMessage)).toBe('Removed from favorites');
		expect(get(modalVisible)).toBe(false);
	});

	it('keeps movie information visible when no poster is returned', async () => {
		mockAppFetch({ description: [] });

		render(MovieCard, { props: { elokuvaTunnus: 'tt3783958' } });

		expect(await screen.findByRole('heading', { name: 'La La Land' })).toBeInTheDocument();
		expect(screen.getByText('Year: 2016')).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByRole('img', { name: 'Poster' })).toHaveAttribute('src', '');
		});
	});

	afterEach(() => {
		resetFavorites();
	});
});

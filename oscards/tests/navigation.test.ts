// Testaa navigaatiokomponenttien linkkien kohteita
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import CategoryButton from '../src/routes/categoryButton.svelte';
import Footer from '../src/lib/Footer.svelte';
import Header from '../src/lib/Header.svelte';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

describe('navigation links', () => {
	it('links the home page category buttons to actor and director pages', async () => {
		const { rerender } = render(CategoryButton, {
			props: { text: 'Actors', polku: '/actors' }
		});

		expect(screen.getByRole('link', { name: 'Actors' })).toHaveAttribute('href', '/actors');

		await rerender({ text: 'Directors', polku: '/directors' });
		expect(screen.getByRole('link', { name: 'Directors' })).toHaveAttribute('href', '/directors');
	});

	it('provides links home, to favorites, and to credits', () => {
		const { unmount } = render(Header, { props: { otsikko: 'actors' } });

		expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/');
		expect(screen.getByRole('link', { name: 'favorite' })).toHaveAttribute('href', '/favorites');
		unmount();

		render(Footer);
		expect(screen.getByRole('link', { name: 'Credits' })).toHaveAttribute('href', '/about');
	});
});

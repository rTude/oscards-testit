// Testaa henkilökortin tietoja ja valintakäsittelijän kutsumista.
import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import PersonCard from '../src/lib/PersonCard.svelte';
import { people } from './fixtures/data';
import { mockAppFetch } from './helpers/mockAppFetch';

describe('PersonCard', () => {
	it('loads and displays the person details and calls its selection handler', async () => {
		const fetchMock = mockAppFetch();
		const onSelect = vi.fn();

		render(PersonCard, { props: { nimi: 'Emma Stone', onclick: onSelect } });

		expect(await screen.findByText('Emma Stone')).toBeInTheDocument();
		expect(screen.getByText('B. 1988')).toBeInTheDocument();
		expect(screen.getByText('American')).toBeInTheDocument();
		expect(screen.getByText('Total movies: 45')).toBeInTheDocument();
		expect(screen.getByText('Oscar nominations: 4')).toBeInTheDocument();
		expect(screen.getByText('x 2')).toBeInTheDocument();
		expect(screen.getByRole('img', { name: 'kuva' })).toHaveAttribute('src', people[0].image);
		expect(fetchMock).toHaveBeenCalledWith('/data/people.json');

		await fireEvent.click(screen.getByText('Emma Stone'));
		expect(onSelect).toHaveBeenCalledOnce();
	});
});

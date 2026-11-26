// Testaa karusellissa liikkumista nuolilla ja viereistä korttia valitsemalla
import { fireEvent, render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { getCarouselStore } from '../src/lib/carouselStore';
import CarouselFixture from './fixtures/CarouselFixture.svelte';

describe('Carousel', () => {
	beforeEach(() => {
		getCarouselStore('carousel-unit-test').set(0);
	});

	it('changes the selected card with arrows and by clicking a neighboring card', async () => {
		const { container } = render(CarouselFixture);

		await fireEvent.click(screen.getByRole('button', { name: 'arrow_forward_ios' }));
		expect(container.querySelector('[data-card="second"][data-diff="0"]')).toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: 'arrow_back_ios' }));
		expect(container.querySelector('[data-card="first"][data-diff="0"]')).toBeInTheDocument();

		const neighboringCard = container.querySelector('[data-card="second"][data-diff="1"]');
		expect(neighboringCard).not.toBeNull();
		if (!neighboringCard) throw new Error('The neighboring card was not rendered');

		await fireEvent.click(neighboringCard);
		expect(container.querySelector('[data-card="second"][data-diff="0"]')).toBeInTheDocument();
	});
});

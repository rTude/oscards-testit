// Testaa karusellistorejen avainkohtaista uudelleenkäyttöä ja erillisyyttä
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { getCarouselStore } from '../src/lib/carouselStore';

describe('getCarouselStore', () => {
	it('reuses a store for the same key and keeps different keys independent', () => {
		const first = getCarouselStore('carousel-store-test');
		const sameFirst = getCarouselStore('carousel-store-test');
		const second = getCarouselStore('another-carousel-store-test');

		first.set(2);

		expect(sameFirst).toBe(first);
		expect(get(sameFirst)).toBe(2);
		expect(get(second)).toBe(0);
	});
});

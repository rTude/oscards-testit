import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/svelte';
import { afterEach, vi } from 'vitest';

vi.mock('svelte/transition', () => ({
	fly: () => ({ duration: 0 }),
	slide: () => ({ duration: 0 })
}));

afterEach(() => {
	cleanup();
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

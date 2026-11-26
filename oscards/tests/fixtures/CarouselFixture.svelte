<script lang="ts">
	import Carousel from '../../src/lib/Carousel.svelte';

	const cards = ['first', 'second', 'third'];
</script>

<Carousel kortit={cards} id="carousel-unit-test">
	{#snippet children(card, diff)}
		<button type="button" data-card={card} data-diff={diff}>{card}:{diff}</button>
	{/snippet}
</Carousel>

<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/env';

	let movie;
	let keywords = [];

	onMount(async () => {
		const baseUrl = dev ? import.meta.env.VITE_DEV_API : import.meta.env.VITE_PROD_API;
		const movieResponse = await fetch(baseUrl + '/api/random-movie');
		movie = await movieResponse.json();
		const keywordsResponse = await fetch(baseUrl + `/api/${movie.id}-keywords`);
		keywords = await keywordsResponse.json();
	});
</script>

<h3 class="text-2xl dark:text-white">5 words used to describe this movie are...</h3>
{#each keywords as keyword}
	<p>{keyword.name}</p>
{/each}
<h3 class="text-2xl dark:text-white">How many names do you need to guess this movie?</h3>

<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/env';
	import Card from '../components/Card.svelte';

	let movie;
	let keywords = [];
	let cast = [];

	onMount(async () => {
		const baseUrl = dev ? import.meta.env.VITE_DEV_API : import.meta.env.VITE_PROD_API;
		const movieResponse = await fetch(baseUrl + '/api/random-movie');
		movie = await movieResponse.json();
		const keywordsResponse = await fetch(baseUrl + `/api/${movie.id}-keywords`);
		const allKeywords = await keywordsResponse.json();
		allKeywords.forEach((keyword, i) => {
			if (i < 10) {
				keywords = [...keywords, keyword];
			}
		});
		const castResponse = await fetch(baseUrl + `/api/${movie.id}-credits`);
		const allCast = await castResponse.json();
		allCast.forEach((castMember, i) => {
			if (i < 10) {
				cast = [...cast, castMember];
			}
		});
		console.log(allCast);
	});
</script>

<h3 class="text-2xl dark:text-white">{keywords.length} words used to describe this movie are...</h3>
<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
	{#each keywords as keyword}
		<Card word={keyword.name} />
	{/each}
</div>
<h3 class="text-2xl dark:text-white">How many names do you need to guess this movie?</h3>
<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
	{#each cast as credit, i}
		<Card word={i + 1} on:cardselected={(event) => console.log(event.detail.word)} />
	{/each}
</div>

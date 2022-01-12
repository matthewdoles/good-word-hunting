<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/env';
	import { fade } from 'svelte/transition';
	import Card from '../components/Card.svelte';

	let movie;
	let keywords = [];
	let castHighToLow = [];
	let castLowToHigh = [];
	let numberOfNames;
	let guess;
	let isCorrect = false;
	let showGame = true;
	let showNumbers = true;
	let showNames = false;
	let showResults = false;

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
				castHighToLow = [...castHighToLow, castMember];
			}
		});
		castLowToHigh = castHighToLow.reverse();
	});

	const onNumberSelected = (event) => {
		numberOfNames = event.detail.word;
		showNumbers = false;
		showNames = true;
	};

	const onGuessSubmit = () => {
		isCorrect = guess.toLowerCase() === movie.title.toLowerCase();
		showNames = false;
		showGame = false;
		showResults = true;
	};
</script>

{#if showGame}
	<h3 class="text-2xl dark:text-white">
		{keywords.length} words used to describe this movie are...
	</h3>
	<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
		{#each keywords as keyword}
			<Card word={keyword.name} />
		{/each}
	</div>

	{#if showNumbers}
		<h3 class="text-2xl dark:text-white">How many names do you need to guess this movie?</h3>
		<p>* from lowest billed to highest billed.</p>
		<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
			<Card word={0} on:cardselected={onNumberSelected} />
			{#each castLowToHigh as credit, i}
				<Card word={i + 1} on:cardselected={onNumberSelected} />
			{/each}
		</div>
	{/if}

	{#if showNames}
		{#if numberOfNames !== 0}
			<h3 class="text-2xl dark:text-white">
				Out of the {castLowToHigh.length} credits in this movie, the {numberOfNames} names from lowest
				billed to highest are...
			</h3>
			<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
				{#each castLowToHigh as credit, i}
					{#if i < numberOfNames}
						<Card word={credit.name} />
					{/if}
				{/each}
			</div>
		{/if}
		<h3 class="text-2xl dark:text-white">What is the name of this movie?</h3>
		<div class="my-4">
			<div class="flex">
				<input
					class="w-full rounded-l-md text-lg p-4 border-2 border-gray-200 dark:bg-gray-800 dark:border-white-200 dark:text-white"
					type="text"
					placeholder="Name of Movie"
					bind:value={guess}
				/>
				<button
					on:click={onGuessSubmit}
					class="text-sm p-4 rounded-l-none rounded-r-md border-gray-200 bg-gray-200 uppercase font-bold"
					>Submit
				</button>
			</div>
		</div>
	{/if}
{/if}

{#if showResults}
	<h3
		class="text-2xl dark:text-white"
		transition:fade={{
			delay: 0,
			duration: 1000
		}}
	>
		You guessed {guess}
	</h3>
	<h3
		class="text-2xl dark:text-white"
		transition:fade={{
			delay: 1000,
			duration: 1000
		}}
	>
		Your answer is...
	</h3>
	<div
		transition:fade={{
			delay: 3000,
			duration: 1000
		}}
	>
		<h3 class="text-2xl dark:text-white">
			{isCorrect ? 'Correct! The' : 'Incorrect, the'} movie was {movie.title}
		</h3>
		<img
			class="w-1/4"
			src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
			alt={movie.title}
		/>
		<h3 class="text-2xl dark:text-white">Keywords</h3>
		<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
			{#each keywords as keyword}
				<Card word={keyword.name} />
			{/each}
		</div>
		<h3 class="text-2xl dark:text-white">Cast</h3>
		<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
			{#each castHighToLow as credit, i}
				<Card word={credit.name} />
			{/each}
		</div>
	</div>
{/if}

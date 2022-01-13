<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	import Credit from './Credit.svelte';

	export let guess;
	export let movie;
	export let cast;
	export let keywords;
	export let isCorrect;

	const dispatch = createEventDispatcher();
</script>

<h3
	class="text-2xl flex justify-center mb-4 dark:text-white"
	in:fade={{
		delay: 0,
		duration: 1000
	}}
>
	You guessed: <p class="text-2xl font-bold pl-2">{guess}</p>
</h3>
<h3
	class="text-2xl text-center my-4 dark:text-white"
	in:fade={{
		delay: 1000,
		duration: 1000
	}}
>
	Your answer is...
</h3>
<div
	in:fade={{
		delay: 3000,
		duration: 1000
	}}
>
	<div class="text-2xl my-4 dark:text-white">
		{#if isCorrect}
			<div class="flex justify-center">
				<p class="text-green-500 font-bold pr-2">Correct!</p>
				<p>The movie was <b>{movie.title}</b></p>
			</div>
		{:else}
			<div class="flex justify-center">
				<p class="text-red-500 font-bold pr-2">Incorrect!</p>
				<p>The movie was <b>{movie.title}</b></p>
			</div>
		{/if}
	</div>
	<div class="flex flex-col items-center">
		<a
			href={`https://www.themoviedb.org/movie/${movie.id}-${movie.title.split(' ').join('-')}`}
			target="_blank"
			class="w-1/4 my-4"
		>
			<img
				class="border-4 border-transparent hover:border-purple-600"
				href={`https://www.themoviedb.org/movie/${movie.id}-${movie.title.split(' ').join('-')}`}
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
			/>
		</a>
		<button
			class="w-1/4 btn btn-block my-4 border-0 bg-purple-600"
			on:click={() => dispatch('newgame')}>Play Again</button
		>
	</div>
	<h3 class="text-2xl dark:text-white">Keywords</h3>
	<div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
		{#each keywords as keyword}
			<Card word={keyword.name} />
		{/each}
	</div>
	<h3 class="text-2xl dark:text-white">Cast</h3>
	<div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
		{#each cast as credit, i}
			<a
				href={`https://www.themoviedb.org/person/${credit.id}-${credit.name.split(' ').join('-')}`}
				target="_blank"
			>
				<Credit {credit} /></a
			>
		{/each}
	</div>
</div>

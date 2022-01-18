<script>
	import { onDestroy, onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { filters } from '../stores/filters';
	import Game from '../components/Game.svelte';
	import GameResults from '../components/GameResults.svelte';
	import { shuffleArray } from '../functions/util';
	import {
		getKeywords,
		getMovieCredits,
		getRandomMovie,
		getSimilarMovies
	} from '../functions/http-requests';

	let movie;
	let keywords = [];
	let cast = [];
	let similarMovies = [];
	let guess;
	let isCorrect = false;
	let showGame = true;
	let isLoading = true;
	let yScroll;
	let filter;
	let unsubscribe;

	onMount(async () => {
		startNewGame();
		unsubscribe = filters.subscribe(($) => (filter = $));
	});

	onDestroy(() => {
		unsubscribe();
	});

	const onNewGame = async () => {
		isLoading = true;
		movie;
		keywords = [];
		cast = [];
		similarMovies = [];
		guess = '';
		isCorrect = false;
		showGame = true;

		startNewGame();
	};

	const startNewGame = async () => {
		yScroll = 0;
		movie = await getRandomMovie();
		keywords = await getKeywords(movie.id);
		cast = await getMovieCredits(movie.id);
		similarMovies = await getSimilarMovies(movie.id);
		if (filter === 'tv') {
			similarMovies.forEach((m) => (m.title = m.name));
		}
		isLoading = false;
	};

	const onGuessSubmit = (event) => {
		if (event.detail.guess.length > 0) {
			yScroll = 0;
			guess = event.detail.guess;
			isCorrect = guess.toLowerCase() === movie.title.toLowerCase();
			showGame = false;
		}
	};
</script>

<svelte:window bind:scrollY={yScroll} />

{#if isLoading}
	<div class="flex justify-center">
		<Jumper size="200" color="#9333ea" unit="px" />
	</div>
{:else if showGame}
	<Game
		{keywords}
		cast={cast.reverse()}
		similarMovies={shuffleArray([...similarMovies, movie])}
		on:guesssubmit={onGuessSubmit}
	/>
{:else}
	<GameResults
		{guess}
		{movie}
		{isCorrect}
		{keywords}
		cast={cast.reverse()}
		on:newgame={onNewGame}
	/>
{/if}

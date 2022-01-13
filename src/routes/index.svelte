<script>
	import { onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
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

	onMount(async () => {
		startNewGame();
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
		movie = await getRandomMovie();
		keywords = await getKeywords(movie.id);
		cast = await getMovieCredits(movie.id);
		similarMovies = await getSimilarMovies(movie.id);
		isLoading = false;
	};

	const onGuessSubmit = (event) => {
		guess = event.detail.guess;
		isCorrect = guess.toLowerCase() === movie.title.toLowerCase();
		showGame = false;
	};
</script>

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

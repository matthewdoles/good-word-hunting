<script>
	import { onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import Game from '../components/Game.svelte';
	import GameResults from '../components/GameResults.svelte';
	import { getKeywords, getMovieCredits, getRandomMovie } from '../functions/http-requests';

	let movie;
	let keywords = [];
	let cast = [];
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
		guess = '';
		isCorrect = false;
		showGame = true;

		startNewGame();
	};

	const startNewGame = async () => {
		movie = await getRandomMovie();
		keywords = await getKeywords(movie.id);
		cast = await getMovieCredits(movie.id);
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
	<Game {keywords} cast={cast.reverse()} on:guesssubmit={onGuessSubmit} />
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

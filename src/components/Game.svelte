<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Card from './Card.svelte';

	export let keywords;
	export let cast;
	export let similarMedia;
	export let filter;

	let showNumbers = true;
	let showNames = false;
	let showMultipleChoice = false;
	let numberOfNames;
	let guess;

	const dispatch = createEventDispatcher();

	const onNumberSelected = (event) => {
		numberOfNames = event.detail.word;
		showNumbers = false;
		showNames = true;
	};
</script>

<h3 class="text-2xl dark:text-white" in:fly={{ x: -400, duration: 750 }}>
	{keywords.length} words used to describe this {filter.prompt.singular} are...
</h3>
<div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
	{#each keywords as keyword}
		<Card word={keyword.name} />
	{/each}
</div>

{#if showNumbers}
	<h3 class="text-2xl dark:text-white" in:fly={{ x: 400, duration: 750 }}>
		How many names do you need to guess this {filter.prompt.singular}?
	</h3>
	<p class="dark:text-white" in:fly={{ x: 400, duration: 750 }}>
		* from lowest billed to highest billed
	</p>
	<div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
		<div class="cursor-pointer">
			<Card word={0} on:cardselected={onNumberSelected} />
		</div>
		{#each cast as credit, i}
			<div class="cursor-pointer">
				<Card word={i + 1} on:cardselected={onNumberSelected} />
			</div>
		{/each}
	</div>
{/if}

{#if showNames}
	{#if numberOfNames !== 0}
		<h3 class="text-2xl dark:text-white" in:fly={{ x: 400, duration: 750 }}>
			Out of the {cast.length} credits in this {filter.prompt.singular}, the {numberOfNames} names from
			lowest billed to highest are...
		</h3>
		<div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
			{#each cast as credit, i}
				{#if i < numberOfNames}
					<Card word={credit.name} />
				{/if}
			{/each}
		</div>
	{/if}
	<div in:fly={{ y: 400, duration: 750 }}>
		<h3 class="text-2xl dark:text-white">
			What is the name of this {filter.prompt.singular}?
		</h3>
		<div class="my-4">
			<div class="flex">
				<input
					class="w-full bg-gray-100 rounded-l-xl text-lg p-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
					type="text"
					placeholder={filter.mediaType === 'movie' ? 'Name of movie' : 'Name of show'}
					on:keyup={(e) => e.key === 'Enter' && dispatch('guesssubmit', { guess })}
					bind:value={guess}
				/>
				<button
					on:click={() => dispatch('guesssubmit', { guess })}
					class="text-sm p-4 rounded-l-none outline-0 border-purple-500 bg-purple-500 uppercase font-bold text-white"
					>Submit
				</button>
				<button
					on:click={() => (showMultipleChoice = true)}
					class="text-sm p-4 rounded-l-none rounded-r-xl outline-0 border-purple-500 uppercase font-bold bg-gray-100 dark:bg-gray-600 dark:text-white"
					>Hint
				</button>
			</div>
		</div>
	</div>
	{#if showMultipleChoice}
		<h3 class="mt-8 text-2xl dark:text-white" in:fly={{ x: 400, duration: 750 }}>
			Which of these {filter.prompt.plural} do you think it could be?
		</h3>
		<div in:fly={{ y: 400, duration: 750 }}>
			<div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
				{#each similarMedia as media}
					<div class="cursor-pointer h-full">
						<Card
							word={media.title}
							on:cardselected={() => dispatch('guesssubmit', { guess: media.title })}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
{/if}

<style>
	input {
		outline: none !important;
	}
</style>

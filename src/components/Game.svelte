<script>
	import { createEventDispatcher } from 'svelte';
	import Card from './Card.svelte';

	export let keywords;
	export let cast;

	let showNumbers = true;
	let showNames = false;
	let numberOfNames;
	let guess;

	const dispatch = createEventDispatcher();

	const onNumberSelected = (event) => {
		numberOfNames = event.detail.word;
		showNumbers = false;
		showNames = true;
	};
</script>

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
		<h3 class="text-2xl dark:text-white">
			Out of the {cast.length} credits in this movie, the {numberOfNames} names from lowest billed to
			highest are...
		</h3>
		<div class="my-4 grid gap-4 md:grid-cols-4 grid-cols-2">
			{#each cast as credit, i}
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
				on:keyup={(e) => e.key === 'Enter' && dispatch('guesssubmit', { guess })}
				bind:value={guess}
			/>
			<button
				on:click={() => dispatch('guesssubmit', { guess })}
				class="text-sm p-4 rounded-l-none rounded-r-md border-gray-200 bg-gray-200 uppercase font-bold"
				>Submit
			</button>
		</div>
	</div>
{/if}

<script>
	import { createEventDispatcher } from 'svelte';
	import { loop_guard } from 'svelte/internal';
	import { scale } from 'svelte/transition';
	export let word;

	const dispatch = createEventDispatcher();

	const cardClasses =
		'p-6 bg-gray-100 text-gray-800 text-center ' +
		'rounded-md shadow-sm hover:shadow-md flex flex-col items-center ' +
		'dark:bg-gray-700 dark:hover:shadow-[0px_0px_4px_rgba(255,255,255,0.7)]';
</script>

<div class={cardClasses} in:scale on:click={() => dispatch('cardselected', { word })}>
	<h2 class="capitalize font-bold dark:text-white">
		{word}
	</h2>
</div>

<script>
	import { scale } from 'svelte/transition';
	export let credit;

	const cardClasses =
		'p-6 bg-gray-100 text-gray-800 text-center border-transparent border-4 h-full ' +
		'rounded-xl flex flex-col items-center justify-center ' +
		'dark:bg-gray-600 hover:border-purple-600';
</script>

<div class={cardClasses} in:scale>
	<h2 class="capitalize font-bold dark:text-white">
		{credit.name}
	</h2>
	<h2 class="dark:text-white">as</h2>
	<h2 class="capitalize font-bold dark:text-white">
		{credit.character}
	</h2>
	<img
		class="mask rounded-xl mt-4"
		src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
		alt={credit.profile_path}
	/>
</div>

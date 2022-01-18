<script>
	import { onMount } from 'svelte';
	import FaLightbulb from 'svelte-icons/fa/FaLightbulb.svelte';
	import filters from '../stores/filters';

	let darkMode = true;
	let listItemClasses = 'h-10 leading-10 text-center rounded-lg align-middle cursor-pointer';

	onMount(() => {
		darkMode = document.documentElement.classList.add('dark');
	});
</script>

<div class="navbar shadow-md bg-purple-600 text-neutral-content">
	<div class="px-2 mx-2">
		<span class="text-lg font-bold">Good Word Hunting</span>
	</div>
	<div class="px-2 mx-2">
		<a class="btn btn-ghost btn-sm rounded-btn" href="/">Home</a>
		<a class="btn btn-ghost btn-sm rounded-btn" href="/about">About</a>
		<div
			class="mx-4 text-lg dark:text-yellow-300 w-7 h-7 cursor-pointer"
			on:click={() => {
				document.documentElement.classList.toggle('dark');
				darkMode = !darkMode;
			}}
		>
			<FaLightbulb />
		</div>
	</div>
	<div class="flex justify-end flex-1 px-2">
		<div class="flex items-stretch">
			<div class="dropdown dropdown-end">
				<div tabindex="0" class="btn btn-ghost rounded-btn">Filter</div>
				<ul
					tabindex="0"
					class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black"
				>
					<li class="">
						<p
							on:click={() => filters.changeMediaType('movie')}
							class={$filters.mediaType === 'movie'
								? `bg-purple-600 dark:text-white ${listItemClasses}`
								: `active:bg-purple-600 active:text-white ${listItemClasses}`}
						>
							Movie
						</p>
					</li>
					<li class="">
						<p
							on:click={() => filters.changeMediaType('tv')}
							class={$filters.mediaType === 'tv'
								? `bg-purple-600 dark:text-white ${listItemClasses}`
								: `active:bg-purple-600 active:text-white ${listItemClasses}`}
						>
							TV
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

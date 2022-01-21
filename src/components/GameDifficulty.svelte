<script>
  let difficulty = 'Medium';

  const listItemClasses = 'h-24 border-l-2 border-transparent cursor-pointer';
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 rounded-xl dark:bg-gray-600">
  <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Difficulty</h3>
  <ul>
    <li
      on:click={() => (difficulty = 'Easy')}
      class={difficulty === 'Easy'
        ? `${listItemClasses} text-purple-500 border-l-purple-500`
        : `${listItemClasses} dark:text-white`}
    >
      <p class="ml-2 text-2xl font-bold">Easy</p>
      <p class="ml-2">All keywords and cast given, multiple choice movies.</p>
    </li>
    <li
      on:click={() => (difficulty = 'Medium')}
      class={difficulty === 'Medium'
        ? `${listItemClasses} text-purple-500 border-l-purple-500`
        : `${listItemClasses} dark:text-white`}
    >
      <p class="ml-2 text-2xl font-bold">Medium</p>
      <p class="ml-2">Choose number of cast members given, guess movie, optional hint.</p>
    </li>
    <li
      on:click={() => (difficulty = 'Hard')}
      class={difficulty === 'Hard'
        ? `${listItemClasses} text-purple-500 border-l-purple-500`
        : `${listItemClasses} dark:text-white`}
    >
      <p class="ml-2 text-2xl font-bold">Hard</p>
      <p class="ml-2">Choose number of cast members given, guess movie, no hint.</p>
    </li>
    <li
      on:click={() => (difficulty = 'Luck')}
      class={difficulty === 'Luck'
        ? `${listItemClasses} text-purple-500 border-l-purple-500`
        : `${listItemClasses} dark:text-white`}
    >
      <p class="ml-2 text-2xl font-bold">Luck</p>
      <p class="ml-2">No cast, no hint, just keywords and straight up guessing.</p>
    </li>
  </ul>
</div>

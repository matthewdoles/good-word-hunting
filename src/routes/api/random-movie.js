export async function get() {
	const randomPage = Math.floor(Math.random() * 80) + 1;
	const path =
		'/3/discover/movie?api_key=' +
		import.meta.env.VITE_API_KEY +
		'&language=' +
		import.meta.env.VITE_API_LANG +
		'&sort_by=original_title.asc' +
		'&include_adult=false' +
		'include_video=false' +
		'&page=' +
		randomPage +
		'&vote_count.gte=1500' +
		'&with_original_language=en';
	const res = await fetch(import.meta.env.VITE_API_BASE_PATH + path);
	const data = await res.json();
	const randomIndex = Math.floor(Math.random() * data.results.length);

	return {
		staus: 200,
		body: data.results[randomIndex]
	};
}

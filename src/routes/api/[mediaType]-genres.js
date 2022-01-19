export async function get({ params }) {
	const path =
		'/3/genre/' +
		params.mediaType +
		'/list?api_key=' +
		import.meta.env.VITE_API_KEY +
		'&language=en-US';
	const res = await fetch(import.meta.env.VITE_API_BASE_PATH + path);
	const data = await res.json();
	return {
		staus: 200,
		body: data.genres
	};
}

export async function get({ params }) {
  let path =
    '/3/discover/' +
    params.mediaType +
    '?api_key=' +
    import.meta.env.VITE_API_KEY +
    '&language=' +
    import.meta.env.VITE_API_LANG +
    '&sort_by=original_title.asc' +
    '&include_adult=false' +
    'include_video=false' +
    '&page=' +
    params.page +
    '&vote_count.gte=' +
    params.voteCount +
    '&vote_average.gte=' +
    params.rating;

  if (params.genres !== 'none') {
    path += '&with_genres=' + params.genres;
  }
  path += '&with_original_language=en';

  const res = await fetch(import.meta.env.VITE_API_BASE_PATH + path);
  const data = await res.json();

  if (params.action === 'random') {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return {
      staus: 200,
      body: data.results[randomIndex]
    };
  }
  return {
    staus: 200,
    body: data
  };
}

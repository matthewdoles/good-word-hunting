# Good Word Hunting

### Description

This project was my first solo foray into a Svelte project. The core functionality of the website itself is a trivia game where the user is given up to 10 keywords to describe a movie/tv show and up to 10 cast members in it to then guess the title of said media. The game itself can be played solo or with friends with the ability to apply various filters and difficulties.

### Design

#### URL

- [https://good-word-hunting.vercel.app/](https://good-word-hunting.vercel.app/)

#### Deployment

The site is hosted on [Vercel](https://vercel.com/), which comes in handy for hosting and deploying more niche frameworks like Next, Nuxt, and Svelte. Every commit or merge to main is setup to automatically re-deploy the main branch into production.

#### API

Data is ultimately pulled from [The Movie Database](https://developers.themoviedb.org/3), but SvelteKit has a great feature where any JavaScript file that default exports a function correlated to an HTTP method becomes an API endpoint. This project utilizes it's own API to retrieve media data using the endpoints found in the [/api](https://github.com/matthewdoles/good-word-hunting/tree/main/src/routes/api) route. Another wonderful featue is the ability to insert dynamic parameters into the route itself. For instance, to get the credits for Star Wars the API route is /api/[mediaType]-[id]-credits. The media type here would be movie and the id of this movie on The Movie Database is 11. The complete production link then being [https://good-word-hunting.vercel.app/api/movie-11-credits](https://good-word-hunting.vercel.app/api/movie-11-credits).

#### Features

##### Game

##### Filters

##### Multiplayer

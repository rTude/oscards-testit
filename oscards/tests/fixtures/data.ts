export const people = [
	{
		id: 1,
		name: 'Emma Stone',
		born: 1988,
		nationality: 'American',
		oscarNominations: 4,
		ocscarWins: 2,
		totalMovies: '45',
		image: 'https://images.example.test/emma-stone.jpg'
	},
	{
		id: 2,
		name: 'Martin Scorsese',
		born: 1942,
		nationality: 'American',
		oscarNominations: 9,
		ocscarWins: 1,
		totalMovies: '26',
		image: 'https://images.example.test/martin-scorsese.jpg'
	}
];

export const movies = [
	{
		id: 1,
		title: 'La La Land',
		year: 2016,
		length: 128,
		imdbRating: 8,
		oscarWins: 6,
		streaming: [],
		imdbID: 'tt3783958'
	},
	{
		id: 2,
		title: 'The Departed',
		year: 2006,
		length: 151,
		imdbRating: 8.5,
		oscarWins: 4,
		streaming: [{ app: 'Netflix', url: 'https://www.netflix.com/title/example' }],
		imdbID: 'tt0407887'
	}
];

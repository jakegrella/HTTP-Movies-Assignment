import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
	id: Date.now(),
	title: '',
	director: '',
	metascore: '',
	stars: '',
};

const AddForm = () => {
	const { push } = useHistory();
	const [movie, setMovie] = useState(initialMovie);

	const handleChange = (event) => {
		event.persist();
		let value = event.target.value;

		setMovie({
			...movie,
			[event.target.name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newMovie = {
			...movie,
			stars: movie.stars.split(', '),
		};
		axios
			.post(`http://localhost:5000/api/movies/`, newMovie)
			.then((res) => {
				console.log(res);
				setMovie(res.data);
				push(`/`);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h2>Add Movie</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='title'
					placeholder='title'
					onChange={handleChange}
					value={movie.title}
				/>
				<input
					type='text'
					name='director'
					placeholder='director'
					onChange={handleChange}
					value={movie.director}
				/>
				<input
					type='text'
					name='metascore'
					placeholder='metascore'
					onChange={handleChange}
					value={movie.metascore}
				/>
				<input
					type='text'
					name='stars'
					placeholder='stars (separate by comma and space)'
					onChange={handleChange}
					value={movie.stars}
				/>
				<button>add</button>
			</form>
		</>
	);
};

export default AddForm;

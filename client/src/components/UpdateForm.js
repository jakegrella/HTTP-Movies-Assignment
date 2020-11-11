import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
	title: '',
	director: '',
	metascore: '',
};

const UpdateForm = (props) => {
	const { push } = useHistory();
	const { id } = useParams();
	const [movie, setMovie] = useState(initialMovie);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				console.log('res.data', res.data);
				setMovie(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
		axios.put(`http://localhost:5000/api/movies/${id}`, movie).then((res) => {
			setMovie(res.data);
			push(`/movies/${id}`);
		});
	};

	return (
		<>
			<h2>Update Movie</h2>
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
				<button>update</button>
			</form>
		</>
	);
};

export default UpdateForm;

import React, { useState, useCallback } from 'react';

import classes from './Pictures.module.css';

import pictures from '../../Assets/Pictures/Pictures';
import BackgroundImage from './BackGroundImage/BackgroundImage';

import Quotes from '../Quotes/Quotes';
import Spinner from '../UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

const Pictures = (props) => {
	const [ currentPictureSrc, setPictureSrc ] = useState('');
	const [ isLoading, setLoading ] = useState(false);
	const [ wasInitialClick, setInitialClick ] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [ isError, setError ] = useState(false);
	const [ imgSource, setImgSource ] = useState(
		'https://i.imgur.com/VO4xfG8.jpg'
	);

	const randomImageHandler = useCallback(
		async () => {
			setLoading(true);
			if (wasInitialClick === false) {
				setInitialClick(true);
			}
			setImgSource(pictures[Math.floor(Math.random() * pictures.length)]);
			await axios
				.get(imgSource)
				.then((response) => {
					setPictureSrc(response.config.url).then(setLoading(false));
				})
				.catch((isError) => {
					setError(true);
					setLoading(false);
				});
		},
		[ imgSource, wasInitialClick ]
	);

	let image = <Quotes />;
	let spinner = null;

	let quoteStyle = {
		color : 'white'
	};

	if (isLoading) {
		spinner = <Spinner />;
		quoteStyle = { color: 'rgba(0,0,0,0)' };
	}

	if (wasInitialClick) {
		image = (
			<div>
				<div>
					<img
						className={classes.img}
						src={currentPictureSrc}
						alt={`${currentPictureSrc}`}
					/>
					<Quotes />
				</div>
				<BackgroundImage currentPicture={currentPictureSrc} />
			</div>
		);
	}

	return (
		<div style={quoteStyle} onClick={randomImageHandler}>
			{spinner}
			{image}
		</div>
	);
};

export default withErrorHandler(
	React.memo(
		Pictures,
		(prevState, nextState) =>
			nextState.wasInitialClick !== prevState.wasInitialClick ||
			(nextState.isLoading !== prevState.isLoading &&
				nextState.imgSource !== prevState.imgSource)
	),
	axios
);
